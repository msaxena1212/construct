const equipmentCtrl = require("../controllers/equipment.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");
module.exports = (router) => {

  // Create equipment
  router.post("/createequipment",  checkPermission("equipment", "can_create"), equipmentCtrl.createequipment);

  // Get all equipments
  router.get("/getAllequipments",  checkPermission("equipment", "can_read"), equipmentCtrl.getAllequipments);

  // Get equipment by ID
  router.get("/getequipmentById/:id", checkPermission("equipment", "can_read"), equipmentCtrl.getequipmentById);

  // Update equipment
  router.put("/updateequipment/:id", checkPermission("equipment", "can_update"),equipmentCtrl.updateequipment);

  // Delete equipment (Soft Delete)
  router.delete("/deleteequipment/:id", checkPermission("equipment", "can_delete"), equipmentCtrl.deleteequipment);

  // Get equipment by project ID
  router.get("/getequipmentByprojectId/:id", checkPermission("equipment", "can_read"), equipmentCtrl.getequipmentByprojectId);


  // Get equipment_history all
  router.get("/getAllequipments_history", checkPermission("equipment", "can_read"), equipmentCtrl.getAllequipments_history);

  router.put("/equipment_stock_transfer/:equipment_id", checkPermission("equipment", "can_update"), equipmentCtrl.equipment_stock_transfer);

};