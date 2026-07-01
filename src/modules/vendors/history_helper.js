const db = require('../../models');

const HistoryModel = db.vendors_history;

const logVendorHistory = async (opts) => {
  try {
    const { req, vendor_id, company_id, project_id = null, entity_type, entity_id = null,
      action, description, old_values = null, new_values = null, meta = null } = opts;

    const user = req?.user;
    const changed_by = user?.id || user?.userId || null;

    const fullName =
      (user?.firstname || user?.lastname)
        ? `${user?.firstname || ''} ${user?.lastname || ''}`.trim()
        : null;

    const changed_by_name =
      fullName ||
      user?.name ||
      user?.fullName ||
      user?.username ||
      user?.email ||
      null;

    await HistoryModel.create({
      company_id, vendor_id, project_id, entity_type, entity_id,
      action, changed_by, changed_by_name, description, old_values, new_values, meta,
    });
  } catch (err) {
    console.error('[logVendorHistory] Failed to write history:', err.message);
  }
};

module.exports = { logVendorHistory };