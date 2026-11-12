const db = require('../../models');
const { logVendorHistory } = require('./history_helper');
const { assertProjectAccess, handleAccessError } = require('../../core/utils/access');
const { evaluateThreeWayMatch } = require('./services/three_way_match.service');
const { logProjectHistory } = require('../projects/project.utils');

const PaymentRequestModel = db.vendors_payment_request;
const InvoiceModel = db.vendors_invoice;
const VendorModel = db.vendors;

const getCompanyId = (req) => req.user?.company_id || req.user?.companyId || null;

const toSafeDecimal = (val, fieldName = 'Amount', max = 1000000000) => {
    const num = Number(val);
    if (isNaN(num) || !isFinite(num) || num <= 0 || num > max) {
        throw new Error(`Invalid ${fieldName}: must be a positive finite number up to ${max}`);
    }
    return Number(num.toFixed(2));
};


const getPaymentRequests = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { status, project_id } = req.query;
        const where = { company_id };
        if (status) where.status = status;
        if (project_id) {
            await assertProjectAccess(req, project_id);
            where.project_id = project_id;
        }

        const requests = await PaymentRequestModel.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (err) {
        if (handleAccessError(err, res)) return;
        console.error('[getPaymentRequests]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const getRequestsByInvoice = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { invoiceId } = req.params;

        const invoice = await InvoiceModel.findOne({ where: { id: invoiceId, company_id } });
        if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

        if (invoice.project_id) {
            await assertProjectAccess(req, invoice.project_id);
        }

        const requests = await PaymentRequestModel.findAll({
            where: { invoice_id: invoiceId, company_id },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ success: true, data: requests });
    } catch (err) {
        if (handleAccessError(err, res)) return;
        console.error('[getRequestsByInvoice]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const createPaymentRequest = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const company_id = getCompanyId(req);
        const { invoiceId } = req.params;
        const {
            amount, mode, reference, clearance_date,
            settlement_type, settlement_completion,
            milestone_ids, sub_milestone_ids, task_ids,
            budget_allocated, budget_invoiced, exceeded_by,
        } = req.body;

        if (!amount || !mode) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Amount and payment mode are required.' });
        }

        const safeAmount = toSafeDecimal(amount, 'Payment request amount');

        const invoice = await InvoiceModel.findOne({
            where: { id: invoiceId, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
        if (!invoice) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        if (invoice.project_id) {
            await assertProjectAccess(req, invoice.project_id);
        }

        if (invoice.status === 'Paid') {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Invoice is already fully paid.' });
        }

        if (invoice.status === 'Cancelled') {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Cannot request payment on a cancelled invoice.' });
        }

        // Calculate currently outstanding balance
        const grandTotal = parseFloat(invoice.grand_total);
        const paidAmount = parseFloat(invoice.paid_amount) || 0;
        const remainingPayable = Number((grandTotal - paidAmount).toFixed(2));

        if (safeAmount > remainingPayable) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Requested amount (₹${safeAmount}) exceeds remaining payable balance (₹${remainingPayable}).`,
            });
        }

        // Check sum of existing pending requests to prevent over-subscription
        const pendingRequests = await PaymentRequestModel.findAll({
            where: { invoice_id: invoiceId, company_id, status: 'pending_approval' },
            transaction: t,
        });
        const totalPending = pendingRequests.reduce((sum, r) => sum + parseFloat(r.amount), 0);
        const availableUnreserved = Number((remainingPayable - totalPending).toFixed(2));

        if (safeAmount > availableUnreserved) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Pending requests of ₹${totalPending} already exist. Maximum available balance for new request: ₹${availableUnreserved}`,
            });
        }

        const request = await PaymentRequestModel.create({
            vendor_id: invoice.vendor_id,
            company_id,
            invoice_id: invoice.id,
            project_id: invoice.project_id || null,
            amount: safeAmount,
            mode,
            reference: reference || null,
            clearance_date: clearance_date || null,
            settlement_type: settlement_type || null,
            settlement_completion: settlement_completion != null ? parseFloat(settlement_completion) : null,
            milestone_ids: Array.isArray(milestone_ids) ? milestone_ids : [],
            sub_milestone_ids: Array.isArray(sub_milestone_ids) ? sub_milestone_ids : [],
            task_ids: Array.isArray(task_ids) ? task_ids : [],
            status: 'pending_approval',
            budget_allocated: budget_allocated || null,
            budget_invoiced: budget_invoiced || null,
            exceeded_by: exceeded_by || null,
            requested_by: req.user?.id || null,
        }, { transaction: t });

        await logVendorHistory({
            req,
            vendor_id: invoice.vendor_id,
            company_id,
            project_id: invoice.project_id || null,
            entity_type: 'invoice',
            entity_id: invoice.id,
            action: 'payment_request_raised',
            description: `Payment request of ₹${safeAmount} raised for Invoice #${invoice.invoice_number}. Pending Finance approval.`,
            new_values: request.toJSON(),
            meta: { invoice_number: invoice.invoice_number, amount: safeAmount, exceeded_by },
        });

        await t.commit();

        return res.status(201).json({
            success: true,
            message: 'Payment request has been submitted successfully and is pending finance approval.',
            data: request,
        });
    } catch (err) {
        await t.rollback().catch(() => {});
        if (handleAccessError(err, res)) return;
        console.error('[createPaymentRequest]', err);
        return res.status(400).json({ success: false, message: err.message });
    }
};

/** Loads what the three-way match needs. Read-only: no locks and no writes. */
const loadMatchContext = async ({ invoice, company_id, transaction = null }) => {
    const invoicePoId = invoice.purchase_order_id || null;
    const grns = await db.goods_receipt_note.findAll({
        where: {
            company_id,
            vendor_id: invoice.vendor_id,
            ...(invoice.project_id && { project_id: invoice.project_id }),
            ...(invoicePoId && { purchase_order_id: invoicePoId }),
        },
        transaction,
    });
    const siblingInvoices = await InvoiceModel.findAll({
        where: {
            company_id,
            vendor_id: invoice.vendor_id,
            ...(invoice.project_id && { project_id: invoice.project_id }),
        },
        attributes: ['id', 'status', 'items'],
        transaction,
    });
    // Invoices whose payment requests are approved or paid count towards cumulative billing.
    const countedRequests = await PaymentRequestModel.findAll({
        where: { company_id, status: ['approved', 'paid'] },
        attributes: ['invoice_id'],
        transaction,
    });
    return {
        grns,
        siblingInvoices,
        countedInvoiceIds: new Set(countedRequests.map((r) => r.invoice_id)),
    };
};

/**
 * GET /:vendorId/invoices/:invoiceId/three-way-match
 * Report only. Shows each line's accepted and billed quantities, remaining capacity, PO and invoice rates, and every
 * exception, so the exceptions are visible before anyone approves the payment request.
 */
const getThreeWayMatch = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { vendorId, invoiceId } = req.params;
        const invoice = await InvoiceModel.findOne({
            where: { id: invoiceId, vendor_id: vendorId, company_id },
        });
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        if (invoice.project_id) {
            await assertProjectAccess(req, invoice.project_id);
        }
        const context = await loadMatchContext({ invoice, company_id });
        const evaluation = evaluateThreeWayMatch({
            invoice,
            grns: context.grns,
            siblingInvoices: context.siblingInvoices,
            countedInvoiceIds: context.countedInvoiceIds,
        });
        const exceptions = [
            ...evaluation.lines
                .filter((l) => l.unidentified)
                .map((l) => ({ index: l.index, code: 'UNIDENTIFIED_LINE', message: `Line ${l.index + 1} lacks item_code or material_id.` })),
            ...evaluation.violations,
        ];
        return res.status(200).json({
            success: true,
            data: {
                invoice_id: invoice.id,
                invoice_number: invoice.invoice_number,
                grn_checked: evaluation.grn_checked,
                status: exceptions.length === 0 ? 'matched' : 'exceptions',
                lines: evaluation.lines,
                exceptions,
            },
        });
    } catch (err) {
        if (handleAccessError(err, res)) return;
        console.error('[getThreeWayMatch]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const approvePaymentRequest = async (req, res) => {
    const isSqlite = db.sequelize.getDialect() === 'sqlite';
    const t = await db.sequelize.transaction();
    try {
        const company_id = getCompanyId(req);
        const { requestId } = req.params;

        const request = await PaymentRequestModel.findOne({
            where: { id: requestId, company_id },
            transaction: t,
            ...(isSqlite ? {} : { lock: t.LOCK.UPDATE }),
        });
        if (!request) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        if (request.status !== 'pending_approval') {
            await t.rollback();
            return res.status(409).json({
                success: false,
                message: `This payment request has already been ${request.status}.`,
            });
        }

        // Segregation of duties: Requester cannot approve their own payment request
        if (request.requested_by && request.requested_by === req.user?.id) {
            await t.rollback();
            return res.status(403).json({
                success: false,
                message: 'Segregation of duties: You cannot approve your own payment request.',
            });
        }

        const invoice = await InvoiceModel.findOne({
            where: { id: request.invoice_id, company_id },
            transaction: t,
            ...(isSqlite ? {} : { lock: t.LOCK.UPDATE }),
        });
        if (!invoice) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        if (invoice.project_id) {
            await assertProjectAccess(req, invoice.project_id);
        }

        // 3-Way match before payment approval. The rules are in services/three_way_match.service.js, the same ones the
        // invoice match report uses, so an approver sees the same exceptions the report showed.
        const invoicePoId = invoice.purchase_order_id || null;
        const invoiceItems = Array.isArray(invoice.items) ? invoice.items : [];
        const { allow_unmatched_exception, exception_reason } = req.body || {};

        // Serialize matching per purchase order: row locks where the database supports them (SQLite serializes writes).
        const poIdsToLock = new Set();
        if (invoicePoId) poIdsToLock.add(Number(invoicePoId));
        invoiceItems.forEach((it) => {
            if (it.purchase_order_id) poIdsToLock.add(Number(it.purchase_order_id));
        });
        for (const pId of Array.from(poIdsToLock).sort((a, b) => a - b)) {
            await db.purchase_order.findOne({
                where: { id: pId, company_id },
                transaction: t,
                ...(isSqlite ? {} : { lock: t.LOCK.UPDATE }),
            });
        }

        const context = await loadMatchContext({ invoice, company_id, transaction: t });
        const evaluation = evaluateThreeWayMatch({
            invoice,
            grns: context.grns,
            siblingInvoices: context.siblingInvoices,
            countedInvoiceIds: context.countedInvoiceIds,
            allowUnmatchedException: Boolean(allow_unmatched_exception),
        });

        const firstViolation = evaluation.violations[0] || null;
        const firstUnidentified = evaluation.lines.find((l) => l.unidentified) || null;
        // Legacy invoice policy: a procurement line without item_code or material_id stops approval, and is reported
        // before any rate or quantity exception on a later line (the same order the checks always ran in).
        if (!allow_unmatched_exception && firstUnidentified && (!firstViolation || firstUnidentified.index <= firstViolation.index)) {
            await t.rollback();
            const description = invoiceItems[firstUnidentified.index]?.description || 'Unnamed';
            return res.status(400).json({
                success: false,
                requires_review: true,
                message: `Legacy invoice compatibility review required: Line item '${description}' lacks required procurement identifiers (item_code / material_id). Ordinary matching cannot bypass linkage without authorized exception.`,
            });
        }

        if (allow_unmatched_exception) {
            // An override skips the GRN checks, so it must say why, and the reason is kept in the project history.
            const reason = String(exception_reason || '').trim();
            if (reason.length < 10) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: 'A three-way match exception needs a reason of at least 10 characters (exception_reason).',
                });
            }
            if (invoice.project_id) {
                await logProjectHistory(
                    {
                        project_id: invoice.project_id,
                        company_id,
                        user_id: req.user?.id || null,
                        action_type: 'MATCH_EXCEPTION_APPROVED',
                        detail: `approved a three-way match exception for invoice ${invoice.invoice_number}: ${reason}`,
                        meta: { payment_request_id: request.id, invoice_id: invoice.id, reason },
                    },
                    t
                );
            }
        } else if (firstViolation) {
            await t.rollback();
            return res.status(400).json({ success: false, message: firstViolation.message });
        }

        const paidNow = parseFloat(request.amount);
        const grandTotal = parseFloat(invoice.grand_total);
        const previouslyPaid = parseFloat(invoice.paid_amount) || 0;
        const totalPaidSoFar = Number((previouslyPaid + paidNow).toFixed(2));

        if (totalPaidSoFar > grandTotal) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Approval failed: payment amount of ₹${paidNow} exceeds invoice remaining balance of ₹${(grandTotal - previouslyPaid).toFixed(2)}.`,
            });
        }

        // Distinct state: approving a payment request marks it 'approved' (authorized).
        // It does NOT mark the invoice Paid until execution is formally recorded.
        await request.update({
            status: 'approved',
            approved_by: req.user?.id || null,
            approved_at: new Date(),
        }, { transaction: t });

        await logVendorHistory({
            req,
            vendor_id: request.vendor_id,
            company_id,
            project_id: request.project_id || null,
            entity_type: 'invoice',
            entity_id: invoice.id,
            action: 'payment_request_approved',
            description: `Payment request approved (authorized). ₹${paidNow} for Invoice #${invoice.invoice_number}. Invoice status unchanged until payment is executed.`,
            new_values: invoice.toJSON(),
            meta: { request_id: request.id, amount: paidNow, invoice_status: invoice.status },
        });

        await t.commit();

        return res.status(200).json({
            success: true,
            message: 'Payment request approved successfully. The invoice has been updated.',
            data: { request, invoice },
        });
    } catch (err) {
        await t.rollback().catch(() => {});
        if (handleAccessError(err, res)) return;
        console.error('[approvePaymentRequest]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const rejectPaymentRequest = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const company_id = getCompanyId(req);
        const { requestId } = req.params;
        const { rejection_reason } = req.body;

        if (!rejection_reason || !String(rejection_reason).trim()) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Rejection reason is required.' });
        }

        const request = await PaymentRequestModel.findOne({
            where: { id: requestId, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
        if (!request) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Request not found' });
        }
        if (request.status !== 'pending_approval') {
            await t.rollback();
            return res.status(409).json({
                success: false,
                message: `This payment request has already been ${request.status}.`,
            });
        }

        await request.update({
            status: 'rejected',
            approved_by: req.user?.id || null,
            approved_at: new Date(),
            rejection_reason: String(rejection_reason).trim().slice(0, 500),
        }, { transaction: t });

        const invoice = await InvoiceModel.findOne({
            where: { id: request.invoice_id, company_id },
            transaction: t,
        });

        await logVendorHistory({
            req,
            vendor_id: request.vendor_id,
            company_id,
            project_id: request.project_id || null,
            entity_type: 'invoice',
            entity_id: request.invoice_id,
            action: 'payment_request_rejected',
            description: `Payment request rejected for Invoice #${invoice?.invoice_number}. Reason: ${rejection_reason}`,
            meta: { request_id: request.id, rejection_reason },
        });

        await t.commit();

        return res.status(200).json({
            success: true,
            message: 'Payment request has been rejected successfully.',
            data: request,
        });
    } catch (err) {
        await t.rollback().catch(() => {});
        if (handleAccessError(err, res)) return;
        console.error('[rejectPaymentRequest]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

const executePayment = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const company_id = getCompanyId(req);
        const { requestId } = req.params;
        const { payment_reference, execution_date } = req.body;

        const request = await PaymentRequestModel.findOne({
            where: { id: requestId, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
        if (!request) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        // Phase 4: Payment Execution Idempotency
        // If request is already paid and the caller retries with the same payment reference, return the existing execution result idempotently
        if (request.status === 'paid') {
            const incomingRef = payment_reference || null;
            if (!incomingRef || request.reference === incomingRef) {
                const invoice = await InvoiceModel.findOne({
                    where: { id: request.invoice_id, company_id },
                    transaction: t,
                });
                await t.rollback();
                return res.status(200).json({
                    success: true,
                    idempotent: true,
                    message: 'Payment was previously executed with this reference (idempotent response).',
                    data: { request, invoice },
                });
            } else {
                await t.rollback();
                return res.status(409).json({
                    success: false,
                    message: `Payment request has already been paid under reference '${request.reference}'. Cannot re-execute with different reference '${incomingRef}'.`,
                });
            }
        }

        if (request.status !== 'approved') {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Payment can only be executed on 'approved' requests. Current status: '${request.status}'.`,
            });
        }

        const effectiveRef = (payment_reference && String(payment_reference).trim() !== '')
            ? String(payment_reference).trim()
            : ((request.reference && String(request.reference).trim() !== '') ? String(request.reference).trim() : null);

        // Verify that this payment reference has not been used by any OTHER payment request within the company
        if (effectiveRef) {
            const existingWithRef = await PaymentRequestModel.findOne({
                where: {
                    company_id,
                    reference: effectiveRef,
                    id: { [db.Sequelize.Op.ne]: request.id },
                },
                transaction: t,
            });

            if (existingWithRef) {
                await t.rollback();
                return res.status(409).json({
                    success: false,
                    message: `Payment reference '${effectiveRef}' is already used by payment request #${existingWithRef.id}. Duplicate references across separate payment requests are not permitted.`,
                });
            }
        }

        const invoice = await InvoiceModel.findOne({
            where: { id: request.invoice_id, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
        if (!invoice) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        if (invoice.project_id) {
            await assertProjectAccess(req, invoice.project_id);
        }

        const paidNow = parseFloat(request.amount);
        const grandTotal = parseFloat(invoice.grand_total);
        const previouslyPaid = parseFloat(invoice.paid_amount) || 0;
        const totalPaidSoFar = Number((previouslyPaid + paidNow).toFixed(2));

        if (totalPaidSoFar > grandTotal) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: `Payment execution failed: total paid (₹${totalPaidSoFar}) exceeds invoice grand total (₹${grandTotal}).`,
            });
        }

        const newStatus = totalPaidSoFar >= grandTotal ? 'Paid' : 'Partially Paid';
        const existingHistory = Array.isArray(invoice.payment_history) ? invoice.payment_history : [];

        const newEntry = {
            amount: paidNow,
            mode: request.mode,
            reference: effectiveRef,
            clearance_date: execution_date || request.clearance_date || null,
            paid_at: new Date().toISOString(),
            executed_by: req.user?.id || null,
            request_id: request.id,
        };

        // Update invoice payment balances and state atomically
        await invoice.update({
            status: newStatus,
            paid_amount: totalPaidSoFar,
            payment_mode: request.mode,
            payment_reference: effectiveRef,
            paid_at: new Date(),
            payment_history: [...existingHistory, newEntry],
        }, { transaction: t });

        // Mark payment request status as 'paid'
        await request.update({
            status: 'paid',
            reference: effectiveRef,
        }, { transaction: t });

        await logVendorHistory({
            req,
            vendor_id: request.vendor_id,
            company_id,
            project_id: request.project_id || null,
            entity_type: 'invoice',
            entity_id: invoice.id,
            action: 'payment_executed',
            description: `Payment execution recorded: ₹${paidNow} via ${request.mode}. Invoice #${invoice.invoice_number} is now ${newStatus}.`,
            new_values: invoice.toJSON(),
            meta: { request_id: request.id, amount: paidNow, new_status: newStatus },
        });

        await t.commit();
        return res.status(200).json({
            success: true,
            message: 'Payment has been successfully executed and recorded on invoice.',
            data: { request, invoice },
        });
    } catch (err) {
        await t.rollback().catch(() => {});
        if (handleAccessError(err, res)) return;
        console.error('[executePayment]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    getPaymentRequests,
    getRequestsByInvoice,
    createPaymentRequest,
    approvePaymentRequest,
    getThreeWayMatch,
    rejectPaymentRequest,
    executePayment,
};