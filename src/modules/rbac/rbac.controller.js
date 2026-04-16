const db = require("../../models");

class RbacController {
  async createModule(req, res) {
    try {
      const { name, path, icon, title, status, order, parentId } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Module name is required" });
      }

      // Check if trying to use nested without parentId properly
      const newModule = await db.rbac_module.create({
        name,
        path: path || null,
        icon: icon || "domain",
        title: title || name,
        status: status !== undefined ? status : true,
        order: order || 0,
        parentId: parentId || null
      });

      res.status(201).json({ message: "Module created successfully", data: newModule });
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: "Module with this name already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getModules(req, res) {
    try {
      const modules = await db.rbac_module.findAll({
        order: [['order', 'ASC']]
      });
      res.status(200).json({ data: modules });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateModule(req, res) {
    try {
      const { id } = req.params;
      const { name, path, icon, status, order, parentId } = req.body;

      const moduleItem = await db.rbac_module.findByPk(id);
      if (!moduleItem) return res.status(404).json({ message: "Module not found" });

      await moduleItem.update({
        name: name || moduleItem.name,
        title: name || moduleItem.title,
        path: path !== undefined ? path : moduleItem.path,
        icon: icon || moduleItem.icon,
        status: status !== undefined ? status : moduleItem.status,
        order: order !== undefined ? order : moduleItem.order,
        parentId: parentId !== undefined ? parentId : moduleItem.parentId
      });

      res.status(200).json({ message: "Module updated successfully", data: moduleItem });
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: "Module name must be unique" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteModule(req, res) {
    try {
      const { id } = req.params;

      const moduleItem = await db.rbac_module.findByPk(id);
      if (!moduleItem) return res.status(404).json({ message: "Module not found" });

      // Ensure no children exist before deleting
      const childrenCount = await db.rbac_module.count({ where: { parentId: id } });
      if (childrenCount > 0) {
        return res.status(400).json({ message: "Cannot delete a module that currently has nested children. Delete or move the sub-menus first." });
      }

      await moduleItem.destroy(); // Hard delete or you can soft delete based on schema
      res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getSidebar(req, res) {
    try {
      let modules = [];
      // Find only modules where the user's role has can_read granting them visibility
      const role_id = req.user.role_id;
      if (!role_id) {
        return res.status(200).json({ data: [] });
      }

      const allowed = await db.rbac_module.findAll({
        include: [{
          model: db.role_permission,
          as: 'module_permissions',
          where: { role_id, can_read: true },
          required: true,
          attributes: []
        }],
        order: [['order', 'ASC']]
      });

      modules = allowed.map(m => m.get({ plain: true }));

      res.status(200).json({ data: modules });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new RbacController();
