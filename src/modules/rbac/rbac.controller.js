'use strict';
const db = require("../../models");
const { MenuRegistryService } = require("../../core/services/menu_registry.service");

class RbacController {
  async createModule(req, res) {
    try {
      const { name, path, icon, title, status, order, parentId } = req.body;

      if (!name || !String(name).trim()) {
        return res.status(400).json({ success: false, message: "Module name is required" });
      }

      // Validate parent exists if provided
      if (parentId) {
        const parent = await db.rbac_module.findByPk(parentId);
        if (!parent) {
          return res.status(400).json({ success: false, message: "Specified parent module does not exist" });
        }
      }

      const newModule = await db.rbac_module.create({
        name: String(name).trim(),
        path: path ? String(path).trim().replace(/^\/+|\/+$/g, '') : null,
        icon: icon || "domain",
        title: title || name,
        status: status !== undefined ? status : true,
        order: order !== undefined ? Number(order) : 0,
        parentId: parentId || null,
      });

      res.status(201).json({ success: true, message: "Module created successfully", data: newModule });
    } catch (error) {
      console.error('[createModule error]:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: "Module with this name already exists" });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  async getModules(req, res) {
    try {
      const modules = await MenuRegistryService.getAuthoritativeModules(db);
      res.status(200).json({ success: true, data: modules });
    } catch (error) {
      console.error('[getModules error]:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  async updateModule(req, res) {
    try {
      const { id } = req.params;
      const { name, path, icon, title, status, order, parentId } = req.body;

      const moduleItem = await db.rbac_module.findByPk(id);
      if (!moduleItem) return res.status(404).json({ success: false, message: "Module not found" });

      // Circular parent check: Cannot set parent to itself
      if (parentId !== undefined && parentId !== null) {
        if (Number(parentId) === Number(id)) {
          return res.status(400).json({ success: false, message: "A module cannot be its own parent" });
        }
        const parent = await db.rbac_module.findByPk(parentId);
        if (!parent) {
          return res.status(400).json({ success: false, message: "Specified parent module does not exist" });
        }
      }

      await moduleItem.update({
        name: name !== undefined ? String(name).trim() : moduleItem.name,
        title: title !== undefined ? title : (name || moduleItem.title),
        path: path !== undefined ? (path ? String(path).trim().replace(/^\/+|\/+$/g, '') : null) : moduleItem.path,
        icon: icon || moduleItem.icon,
        status: status !== undefined ? Boolean(status) : moduleItem.status,
        order: order !== undefined ? Number(order) : moduleItem.order,
        parentId: parentId !== undefined ? (parentId ? Number(parentId) : null) : moduleItem.parentId,
      });

      res.status(200).json({ success: true, message: "Module updated successfully", data: moduleItem });
    } catch (error) {
      console.error('[updateModule error]:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ success: false, message: "Module name must be unique" });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  async deleteModule(req, res) {
    try {
      const { id } = req.params;

      const moduleItem = await db.rbac_module.findByPk(id);
      if (!moduleItem) return res.status(404).json({ success: false, message: "Module not found" });

      // Ensure no children exist before deleting
      const childrenCount = await db.rbac_module.count({ where: { parentId: id } });
      if (childrenCount > 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete a module that currently has nested children. Delete or move the sub-menus first.",
        });
      }

      await moduleItem.destroy();
      res.status(200).json({ success: true, message: "Module deleted successfully" });
    } catch (error) {
      console.error('[deleteModule error]:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  async getSidebar(req, res) {
    try {
      const role_id = req.user?.role_id;
      const role_name = req.user?.role_name;
      const user_email = req.user?.email;

      const sidebarModules = await MenuRegistryService.getSidebarForRole(db, role_id, role_name, user_email);

      res.status(200).json({ success: true, data: sidebarModules });
    } catch (error) {
      console.error('[getSidebar error]:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  async resetToCanonical(req, res) {
    try {
      const role_name = req.user?.role_name;
      const user_email = req.user?.email;
      const normalizedRole = role_name ? String(role_name).trim().toLowerCase().replace(/[\s_-]+/g, '') : '';
      const isAdmin =
        (user_email && String(user_email).trim().toLowerCase() === 'gyanprakash@elitemindz.co') ||
        [
          'admin',
          'superadmin',
          'owner',
          'projectdirector',
          'projectadmin',
          'companyadmin',
          'enterpriseadmin',
        ].includes(normalizedRole);

      if (!isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Only authorized enterprise administrators can reset canonical navigation menus."
        });
      }

      const result = await MenuRegistryService.seedCanonicalMenus(db);
      const modules = await db.rbac_module.findAll({ order: [['order', 'ASC']] });
      res.status(200).json({
        success: true,
        message: "Menus successfully synchronized to canonical registry",
        data: {
          topLevelCount: result?.topLevelCount || 10,
          childCount: result?.childCount || 0,
          modules,
        },
      });
    } catch (error) {
      console.error('[resetToCanonical error]:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new RbacController();
