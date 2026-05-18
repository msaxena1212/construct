const db = require('../../models');

const TaskModel = db.vendors_task;
const VendorModel = db.vendors;

const getCompanyId = (req) =>
  req.user?.company_id || req.user?.companyId || null;

const STATUS_LABEL = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  on_hold: 'On Hold',
};

const mapTask = (task) => ({
  id: task.id,
  title: task.title,
  status: STATUS_LABEL[task.status] || task.status,
  statusRaw: task.status,
  date: task.task_date
    ? new Date(task.task_date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
    : null,
  vendor_id: task.vendor_id,
  company_id: task.company_id,
});

const getTasksByVendor = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const tasks = await TaskModel.findAll({
      where: { vendor_id: vendorId, company_id },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks.map(mapTask),
    });
  } catch (err) {
    console.error('[getTasksByVendor]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const company_id = getCompanyId(req);
    const { vendorId } = req.params;
    const { title, status, task_date } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'title is required' });
    }

    const vendor = await VendorModel.findOne({ where: { id: vendorId, company_id } });
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });

    const task = await TaskModel.create({
      vendor_id: vendorId,
      company_id,
      title,
      status: status || 'pending',
      task_date: task_date || null,
    });

    return res.status(201).json({ success: true, message: 'Task created', data: mapTask(task) });
  } catch (err) {
    console.error('[createTask]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const task = await TaskModel.findOne({ where: { id: req.params.id, company_id } });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    delete req.body.company_id;
    delete req.body.vendor_id;
    await task.update(req.body);

    return res.status(200).json({ success: true, message: 'Task updated', data: mapTask(task) });
  } catch (err) {
    console.error('[updateTask]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const company_id = getCompanyId(req);

    const task = await TaskModel.findOne({ where: { id: req.params.id, company_id } });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    await task.destroy();
    return res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (err) {
    console.error('[deleteTask]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getTasksByVendor, createTask, updateTask, deleteTask };