const db = require("../../models");

const checkPermission = (modulePath, action = "can_read") => {
  return async (req, res, next) => {
    try {

      const role_id = req.user.role_id;

      const moduleData = await db.rbac_module.findOne({
        where: {
          path: modulePath
        }
      });

      if (!moduleData) {
        return res.status(404).json({
          message: "Module not found"
        });
      }

      const permission = await db.role_permission.findOne({
        where: {
          role_id,
          module_id: moduleData.id,
          [action]: true
        }
      });

      if (!permission) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      next();

    } catch (error) {
      console.error("Permission Middleware Error:", error);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };
};

module.exports = checkPermission;