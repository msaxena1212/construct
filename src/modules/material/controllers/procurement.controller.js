'use strict';
const db = require('../../../models');
const StockLedgerService = require('../../../core/services/stock_ledger.service');
const { assertProjectAccess, handleAccessError } = require('../../../core/utils/access');

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

/**
 * Procurement Controller managing Purchase Orders, Goods Receipt Notes,
 * Inspection, and 3-Way Matching against Vendor Invoices.
 */
class ProcurementController {
  // ── Purchase Order Operations ──────────────────────────────────────────

  async createPO(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const {
        po_number,
        project_id,
        vendor_id,
        quotation_id,
        order_date,
        expected_delivery_date,
        items,
        notes,
      } = req.body;

      if (!po_number || !project_id || !vendor_id || !order_date || !Array.isArray(items) || items.length === 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'po_number, project_id, vendor_id, order_date, and non-empty items array are required.',
        });
      }

      await assertProjectAccess(req, project_id);

      // Verify vendor belongs to same company
      const vendor = await db.vendors.findOne({ where: { id: vendor_id, company_id }, transaction: t });
      if (!vendor) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Vendor not found.' });
      }

      // Check unique PO number within company
      const existing = await db.purchase_order.findOne({
        where: { company_id, po_number: String(po_number).trim() },
        transaction: t,
      });
      if (existing) {
        await t.rollback();
        return res.status(409).json({ success: false, message: `PO #${po_number} already exists.` });
      }

      // Validate line items and compute total
      let calculatedTotal = 0;
      const validatedItems = items.map((it, idx) => {
        const qty = Number(it.quantity);
        const rate = Number(it.unit_price || it.rate || 0);
        if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate < 0) {
          throw new Error(`Item at line ${idx + 1} has invalid quantity or unit price.`);
        }
        const lineTotal = Number((qty * rate).toFixed(2));
        calculatedTotal += lineTotal;
        return {
          item_code: String(it.item_code || `ITEM-${idx + 1}`),
          description: String(it.description || ''),
          material_id: it.material_id || null,
          quantity: qty,
          unit_of_measure: String(it.unit_of_measure || 'units'),
          unit_price: rate,
          line_total: lineTotal,
          received_qty: 0,
        };
      });

      const po = await db.purchase_order.create(
        {
          po_number: String(po_number).trim(),
          company_id,
          project_id,
          vendor_id,
          quotation_id: quotation_id || null,
          order_date,
          expected_delivery_date: expected_delivery_date || null,
          status: 'draft',
          items: validatedItems,
          total_amount: Number(calculatedTotal.toFixed(2)),
          notes: notes || null,
          created_by: req.user?.id || null,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(201).json({ success: true, message: 'Purchase order created.', data: po });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[createPO]', err);
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  async approvePO(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const { id } = req.params;

      const po = await db.purchase_order.findOne({
        where: { id, company_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!po) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Purchase order not found.' });
      }

      await assertProjectAccess(req, po.project_id);

      if (po.status !== 'draft' && po.status !== 'submitted') {
        await t.rollback();
        return res.status(409).json({ success: false, message: `PO is already ${po.status}.` });
      }

      // Segregation of duties: Creator cannot approve own purchase order
      if (po.created_by && po.created_by === req.user?.id) {
        await t.rollback();
        return res.status(403).json({
          success: false,
          message: 'Segregation of duties: Creator cannot approve their own purchase order.',
        });
      }

      await po.update(
        {
          status: 'approved',
          approved_by: req.user?.id || null,
          approved_at: new Date(),
        },
        { transaction: t }
      );

      // Book commitments in append-only commitment ledger
      const CommitmentLedgerService = require('../../../core/services/commitment_ledger.service');
      await CommitmentLedgerService.recordPOApprovalCommitment({
        purchase_order: po,
        performed_by: req.user?.id || null,
        transaction: t,
      });

      await t.commit();
      return res.status(200).json({ success: true, message: 'Purchase order approved.', data: po });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[approvePO]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ── Goods Receipt & Inspection ──────────────────────────────────────────

  async createGRN(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const company_id = getCompanyId(req);
      const {
        grn_number,
        purchase_order_id,
        receipt_date,
        delivery_challan_number,
        vehicle_number,
        items,
        inspection_notes,
      } = req.body;

      if (!grn_number || !purchase_order_id || !receipt_date || !Array.isArray(items) || items.length === 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'grn_number, purchase_order_id, receipt_date, and items array are required.',
        });
      }

      // Fetch purchase order
      const po = await db.purchase_order.findOne({
        where: { id: purchase_order_id, company_id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!po) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Purchase order not found.' });
      }

      await assertProjectAccess(req, po.project_id);

      if (po.status !== 'approved' && po.status !== 'partially_received') {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Cannot receive goods against PO in '${po.status}' status. PO must be approved.`,
        });
      }

      // Check unique GRN number
      const existingGRN = await db.goods_receipt_note.findOne({
        where: { company_id, grn_number: String(grn_number).trim() },
        transaction: t,
      });
      if (existingGRN) {
        await t.rollback();
        return res.status(409).json({ success: false, message: `GRN #${grn_number} already exists.` });
      }

      // Reconcile line items against PO ordered and already received quantities
      const poItems = Array.isArray(po.items) ? [...po.items] : [];
      const grnItems = [];

      for (const it of items) {
        const poLine = poItems.find(
          (p) => (it.item_code && p.item_code === it.item_code) || (it.material_id && p.material_id === it.material_id)
        );
        if (!poLine) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: `Received item '${it.item_code || it.description}' does not belong to PO #${po.po_number}.`,
          });
        }

        const receivedQty = Number(it.received_qty || 0);
        const acceptedQty = Number(it.accepted_qty != null ? it.accepted_qty : receivedQty);
        const rejectedQty = Number(it.rejected_qty || 0);

        if (acceptedQty + rejectedQty > receivedQty) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: 'Accepted + rejected quantity cannot exceed total received quantity.',
          });
        }

        const alreadyReceived = Number(poLine.received_qty || 0);
        const remainingOrdered = Number(poLine.quantity) - alreadyReceived;

        if (acceptedQty > remainingOrdered) {
          await t.rollback();
          return res.status(400).json({
            success: false,
            message: `Over-receipt: Accepted qty (${acceptedQty}) exceeds remaining PO qty (${remainingOrdered}) for item ${poLine.item_code}.`,
          });
        }

        poLine.received_qty = alreadyReceived + acceptedQty;

        grnItems.push({
          item_code: poLine.item_code,
          material_id: poLine.material_id,
          unit_of_measure: poLine.unit_of_measure,
          unit_price: poLine.unit_price,
          received_qty: receivedQty,
          accepted_qty: acceptedQty,
          rejected_qty: rejectedQty,
          rejection_reason: it.rejection_reason || null,
        });

        // If accepted quantity > 0, post directly to append-only STOCK_LEDGER
        if (acceptedQty > 0) {
          await StockLedgerService.recordMovement({
            company_id,
            project_id: po.project_id,
            material_id: poLine.material_id,
            movement_type: 'receipt',
            quantity: acceptedQty,
            unit_of_measure: poLine.unit_of_measure,
            unit_cost: poLine.unit_price,
            reference_type: 'GRN',
            reference_id: grn_number,
            idempotency_key: `GRN-${grn_number}-${poLine.item_code}`,
            reason: `GRN delivery acceptance from PO #${po.po_number}`,
            performed_by: req.user?.id || null,
            transaction: t,
          });
        }
      }

      // Check if PO is completely fulfilled
      const allFulfilled = poItems.every((p) => Number(p.received_qty) >= Number(p.quantity));
      po.items = poItems;
      po.status = allFulfilled ? 'completed' : 'partially_received';
      await po.save({ transaction: t });

      const grn = await db.goods_receipt_note.create(
        {
          grn_number: String(grn_number).trim(),
          company_id,
          project_id: po.project_id,
          vendor_id: po.vendor_id,
          purchase_order_id: po.id,
          receipt_date,
          delivery_challan_number: delivery_challan_number || null,
          vehicle_number: vehicle_number || null,
          items: grnItems,
          status: grnItems.some((i) => i.rejected_qty > 0) ? 'partially_accepted' : 'inspected',
          inspection_notes: inspection_notes || null,
          received_by: req.user?.id || null,
          inspected_by: req.user?.id || null,
          inspected_at: new Date(),
        },
        { transaction: t }
      );

      // Release commitment for accepted GRN quantities
      const CommitmentLedgerService = require('../../../core/services/commitment_ledger.service');
      await CommitmentLedgerService.recordGRNCommitmentRelease({
        grn,
        purchase_order: po,
        performed_by: req.user?.id || null,
        transaction: t,
      });

      await t.commit();
      return res.status(201).json({
        success: true,
        message: 'Goods receipt note recorded and stock ledger updated.',
        data: { grn, po_status: po.status },
      });
    } catch (err) {
      await t.rollback().catch(() => {});
      if (handleAccessError(err, res)) return;
      console.error('[createGRN]', err);
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // ── 3-Way Matching Engine ──────────────────────────────────────────────

  async matchInvoice(req, res) {
    try {
      const company_id = getCompanyId(req);
      const { invoice_id } = req.params;

      const invoice = await db.vendors_invoice.findOne({ where: { id: invoice_id, company_id } });
      if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found.' });

      if (invoice.project_id) {
        await assertProjectAccess(req, invoice.project_id);
      }

      const invoicePoId = invoice.purchase_order_id || null;
      // Fetch POs and GRNs for this vendor and project (scoped to PO if invoice is linked)
      const purchaseOrders = await db.purchase_order.findAll({
        where: {
          company_id,
          vendor_id: invoice.vendor_id,
          ...(invoice.project_id && { project_id: invoice.project_id }),
          ...(invoicePoId && { id: invoicePoId }),
        },
      });

      const grns = await db.goods_receipt_note.findAll({
        where: {
          company_id,
          vendor_id: invoice.vendor_id,
          ...(invoice.project_id && { project_id: invoice.project_id }),
          ...(invoicePoId && { purchase_order_id: invoicePoId }),
        },
      });

      // Match invoice items against accepted GRN quantities and PO rates
      const invoiceItems = Array.isArray(invoice.items) ? invoice.items : [];
      const matchReport = [];
      let totalAcceptedValue = 0;
      let hasDiscrepancy = false;

      for (const invIt of invoiceItems) {
        let acceptedTotal = 0;
        let expectedUnitPrice = null;
        const targetPoId = invIt.purchase_order_id || invoicePoId;

        // Sum accepted quantities from GRNs matching this item and PO
        for (const g of grns) {
          if (targetPoId && Number(g.purchase_order_id) !== Number(targetPoId)) {
            continue;
          }
          const gItems = Array.isArray(g.items) ? g.items : [];
          for (const gi of gItems) {
            const codeMatch = invIt.item_code && gi.item_code && String(invIt.item_code).trim().toLowerCase() === String(gi.item_code).trim().toLowerCase();
            const descMatch = invIt.description && gi.item_code && String(invIt.description).trim().toLowerCase().includes(String(gi.item_code).trim().toLowerCase());
            const matIdMatch = invIt.material_id && gi.material_id && Number(invIt.material_id) === Number(gi.material_id);
            if (codeMatch || descMatch || matIdMatch) {
              acceptedTotal += Number(gi.accepted_qty || 0);
              if (expectedUnitPrice === null && gi.unit_price) {
                expectedUnitPrice = Number(gi.unit_price);
              }
            }
          }
        }

        const billedQty = Number(invIt.quantity || 0);
        const billedPrice = Number(invIt.unit_price || invIt.rate || 0);

        const qtyDiff = billedQty - acceptedTotal;
        const priceDiff = expectedUnitPrice !== null ? billedPrice - expectedUnitPrice : 0;
        const itemMismatched = qtyDiff > 0 || (expectedUnitPrice !== null && Math.abs(priceDiff) > 0.01);

        if (itemMismatched) hasDiscrepancy = true;
        totalAcceptedValue += acceptedTotal * (expectedUnitPrice || billedPrice);

        matchReport.push({
          item_code: invIt.item_code || invIt.description,
          billed_qty: billedQty,
          accepted_qty: acceptedTotal,
          billed_price: billedPrice,
          po_price: expectedUnitPrice,
          matched: !itemMismatched,
          discrepancy_reason: itemMismatched
            ? `${qtyDiff > 0 ? `Billed ${qtyDiff} units more than accepted in GRN. ` : ''}${
                Math.abs(priceDiff) > 0.01 ? `Price difference of ₹${priceDiff.toFixed(2)}.` : ''
              }`.trim()
            : 'OK',
        });
      }

      return res.status(200).json({
        success: true,
        match_status: hasDiscrepancy ? 'discrepancy_found' : 'verified_match',
        data: {
          invoice_number: invoice.invoice_number,
          billed_total: Number(invoice.grand_total),
          accepted_value: Number(totalAcceptedValue.toFixed(2)),
          line_item_matches: matchReport,
        },
      });
    } catch (err) {
      if (handleAccessError(err, res)) return;
      console.error('[matchInvoice]', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new ProcurementController();
