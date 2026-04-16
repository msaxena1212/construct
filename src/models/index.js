const {sequelize, connectDB, Model, Sequelize, DataTypes} = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// RBAC START
db.user = require("../modules/users/models/user.model.js")(sequelize, Sequelize);
db.company = require("../modules/users/models/company.model.js")(sequelize, Sequelize);
db.role = require("../modules/rbac/models/roles.model.js")(sequelize, Sequelize);
db.rbac_module = require("../modules/rbac/models/module.model.js")(sequelize, Sequelize);

db.company.hasMany(db.user, { foreignKey: "company_id" });
db.user.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.company.hasMany(db.role, { foreignKey: "company_id", as: "roles" });
db.role.belongsTo(db.company, { foreignKey: "company_id", as: "company" });

db.role.hasMany(db.user, { foreignKey: "role_id" });
db.user.belongsTo(db.role, { foreignKey: "role_id", as: "role" });

db.role_permission = require("../modules/rbac/models/role_permission.model.js")(sequelize, Sequelize);

// Permissions associations
db.role.hasMany(db.role_permission, { foreignKey: 'role_id', as: 'permissions' });
db.role_permission.belongsTo(db.role, { foreignKey: 'role_id' });

db.rbac_module.hasMany(db.role_permission, { foreignKey: 'module_id', as: 'module_permissions' });
db.role_permission.belongsTo(db.rbac_module, { foreignKey: 'module_id', as: 'module' });

// RBAC END

connectDB();
module.exports = db;
