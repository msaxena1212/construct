const db = require('../../models');
const { logVendorHistory } = require('./history_helper');

const PaymentRequestModel = db.vendors_payment_request;
const InvoiceModel = db.vendors_invoice;
const VendorModel = db.vendors;

const getCompanyId = (req) =>
    req.user?.company_id || req.user?.companyId || null;


const getPaymentRequests = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { status } = req.query;
        const where = { company_id };
        if (status) where.status = status;

        const requests = await PaymentRequestModel.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (err) {
        console.error('[getPaymentRequests]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getRequestsByInvoice = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { invoiceId } = req.params;
        const requests = await PaymentRequestModel.findAll({
            where: { invoice_id: invoiceId, company_id },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ success: true, data: requests });
    } catch (err) {
        console.error('[getRequestsByInvoice]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


const createPaymentRequest = async (req, res) => {
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
            return res.status(400).json({ success: false, message: 'Amount and payment mode are required.' });
        }

        const invoice = await InvoiceModel.findOne({
            where: { id: invoiceId, company_id },
        });
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }


        const request = await PaymentRequestModel.create({
            vendor_id: invoice.vendor_id,
            company_id,
            invoice_id: invoice.id,
            project_id: invoice.project_id || null,
            amount: parseFloat(amount),
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
        });

        await logVendorHistory({
            req,
            vendor_id: invoice.vendor_id,
            company_id,
            project_id: invoice.project_id || null,
            entity_type: 'invoice',
            entity_id: invoice.id,
            action: 'payment_request_raised',
            description: `Payment request of ₹${amount} raised for Invoice #${invoice.invoice_number} (Budget Exceeded). Pending Finance approval.`,
            new_values: request.toJSON(),
            meta: { invoice_number: invoice.invoice_number, amount, exceeded_by },
        });

        return res.status(201).json({
            success: true,
            message: 'Payment request has been submitted successfully and is pending finance approval.',
            data: request,
        });
    } catch (err) {
        console.error('[createPaymentRequest]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


const approvePaymentRequest = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { requestId } = req.params;

        const request = await PaymentRequestModel.findOne({
            where: { id: requestId, company_id },
        });
        if (!request) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }
        if (request.status !== 'pending_approval') {
            return res.status(400).json({
                success: false,
                message: `This payment request has already been ${request.status}.`,
            });
        }

        const invoice = await InvoiceModel.findOne({
            where: { id: request.invoice_id, company_id },
        });
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        const paidNow = parseFloat(request.amount);
        const grandTotal = parseFloat(invoice.grand_total);
        const previouslyPaid = parseFloat(invoice.paid_amount) || 0;
        const totalPaidSoFar = previouslyPaid + paidNow;
        const newStatus = totalPaidSoFar >= grandTotal ? 'Paid' : 'Partially Paid';

        const existingHistory = Array.isArray(invoice.payment_history)
            ? invoice.payment_history : [];

        const newEntry = {
            amount: paidNow,
            mode: request.mode,
            reference: request.reference || null,
            clearance_date: request.clearance_date || null,
            paid_at: new Date().toISOString(),
            budget_exceeded: true,
            approved_via_request: true,
            request_id: request.id,
        };

        await invoice.update({
            status: newStatus,
            paid_amount: totalPaidSoFar,
            payment_mode: request.mode,
            payment_reference: request.reference || null,
            cheque_clearance_date: request.clearance_date || null,
            paid_at: new Date(),
            payment_history: [...existingHistory, newEntry],
            ...(request.settlement_type && {
                settlement_type: request.settlement_type,
                settlement_completion: request.settlement_completion,
                milestone_ids: request.milestone_ids,
                sub_milestone_ids: request.sub_milestone_ids,
                task_ids: request.task_ids,
            }),
        });

        await request.update({
            status: 'approved',
            approved_by: req.user?.id || null,
            approved_at: new Date(),
        });

        await logVendorHistory({
            req,
            vendor_id: request.vendor_id,
            company_id,
            project_id: request.project_id || null,
            entity_type: 'invoice',
            entity_id: invoice.id,
            action: 'payment_request_approved',
            description: `Payment request approved. ₹${paidNow} paid for Invoice #${invoice.invoice_number}. Status: ${newStatus}.`,
            new_values: invoice.toJSON(),
            meta: { request_id: request.id, amount: paidNow, new_status: newStatus },
        });

        return res.status(200).json({
            success: true,
            message: 'Payment request approved successfully. The invoice has been updated.',
            data: { request, invoice },
        });
    } catch (err) {
        console.error('[approvePaymentRequest]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


const rejectPaymentRequest = async (req, res) => {
    try {
        const company_id = getCompanyId(req);
        const { requestId } = req.params;
        const { rejection_reason } = req.body;

        const request = await PaymentRequestModel.findOne({
            where: { id: requestId, company_id },
        });
        if (!request) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }
        if (request.status !== 'pending_approval') {
            return res.status(400).json({
                success: false,
                message: `This payment request has already been ${request.status}.`,
            });
        }

        await request.update({
            status: 'rejected',
            approved_by: req.user?.id || null,
            approved_at: new Date(),
            rejection_reason: rejection_reason || null,
        });

        const invoice = await InvoiceModel.findOne({
            where: { id: request.invoice_id, company_id },
        });

        await logVendorHistory({
            req,
            vendor_id: request.vendor_id,
            company_id,
            project_id: request.project_id || null,
            entity_type: 'invoice',
            entity_id: request.invoice_id,
            action: 'payment_request_rejected',
            description: `Payment request rejected for Invoice #${invoice?.invoice_number}. Reason: ${rejection_reason || 'N/A'}`,
            meta: { request_id: request.id, rejection_reason },
        });

        return res.status(200).json({
            success: true,
            message: 'Payment request has been rejected successfully.',
            data: request,
        });
    } catch (err) {
        console.error('[rejectPaymentRequest]', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    getPaymentRequests,
    getRequestsByInvoice,
    createPaymentRequest,
    approvePaymentRequest,
    rejectPaymentRequest,
};