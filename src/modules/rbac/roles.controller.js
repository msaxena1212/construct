const db = require("../../models");
const { Op } = require("sequelize");
class RolesController {
  async createRole(req, res) {
    try {
      const { name, type } = req.body;
      const company_id = req.user?.company_id;

      if (!name) {
        return res.status(400).json({ message: "Role name is required" });
      }

      // Check if role exists for this company
      const existingRole = await db.role.findOne({
        where: { name, company_id, is_deleted: false }
      });

      if (existingRole) {
        return res.status(400).json({ message: "Role already exists for this company" });
      }

      const newRole = await db.role.create({
        name,
        type: type || 'CUSTOM',
        company_id
      });

      res.status(201).json({ message: "Role created successfully", data: newRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCompanyRoles(req, res) {
    try {
      const company_id = req.user?.company_id || null;
      let roles = [];
      if (company_id) {
        roles = await db.role.findAll({
          where: { company_id, is_deleted: false },
          order: [['id', 'DESC']]
        });
      } else {
        // For Super Admin roles only get Static roles
        roles = await db.role.findAll({
          where: { type: 'STATIC', is_deleted: false },
          order: [['id', 'DESC']]
        });
      }

      res.status(200).json({ data: roles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const company_id = req.user?.company_id;

      if (!name) {
        return res.status(400).json({ message: "Role name is required" });
      }

      const role = await db.role.findOne({ where: { id, company_id, is_deleted: false } });

      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      role.name = name;
      if (type) role.type = type;

      await role.save();

      res.status(200).json({ message: "Role updated successfully", data: role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user?.company_id;

      const role = await db.role.findOne({ where: { id, company_id, is_deleted: false } });

      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      // Soft delete
      role.is_deleted = true;
      await role.save();

      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getRolePermissions(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user?.company_id || null;

      // Verify role belongs to company (or is readable)
      // const role = await db.role.findOne({ where: { id, company_id, is_deleted: false } });
      const role = await db.role.findOne({
        where: {
          id,
          is_deleted: false,
          [Op.or]: [
            { company_id },
            { company_id: null }
          ]
        }
      });
      if (!role) {
        return res.status(404).json({ message: "Role not found or access denied" });
      }

      // Get all modules
      const modules = await db.rbac_module.findAll({
        order: [['order', 'ASC']],
        raw: true
      });

      // Get permissions for this role
      const permissions = await db.role_permission.findAll({
        where: { role_id: id },
        raw: true
      });

      // Map permissions to modules
      const map = new Map();
      permissions.forEach(p => map.set(p.module_id, p));

      const data = modules.map(m => {
        const p = map.get(m.id) || { can_create: false, can_read: false, can_update: false, can_delete: false };
        return {
          ...m,
          permissions: {
            can_create: !!p.can_create,
            can_read: !!p.can_read,
            can_update: !!p.can_update,
            can_delete: !!p.can_delete,
          }
        };
      });

      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateRolePermissions(req, res) {
    try {
      const { id } = req.params;
      const company_id = req.user?.company_id || null;
      const { permissions } = req.body; // Array of { module_id, can_create, can_read, can_update, can_delete }

      // const role = await db.role.findOne({ where: { id, company_id, is_deleted: false } });
      const role = await db.role.findOne({
        where: {
          id,
          is_deleted: false,
          [Op.or]: [
            { company_id },
            { company_id: null }
          ]
        }
      });
      if (!role) {
        return res.status(404).json({ message: "Role not found or access denied" });
      }

      if (!Array.isArray(permissions)) {
        return res.status(400).json({ message: "Invalid permissions format. Array expected." });
      }

      // Destroy old
      await db.role_permission.destroy({ where: { role_id: id } });

      // Insert new
      const payloads = permissions.map(p => ({
        role_id: id,
        module_id: p.module_id,
        can_create: !!p.can_create,
        can_read: !!p.can_read,
        can_update: !!p.can_update,
        can_delete: !!p.can_delete,
      }));

      if (payloads.length > 0) {
        await db.role_permission.bulkCreate(payloads);
      }

      res.status(200).json({ message: "Permissions updated successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new RolesController();
