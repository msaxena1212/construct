const equipmentCtrl = require("../controllers/equipment.controller");

module.exports = (router) => {

  // Create equipment
  router.post("/createequipment", equipmentCtrl.createequipment);

  // Get all equipments
  router.get("/getAllequipments", equipmentCtrl.getAllequipments);

  // Get equipment by ID
  router.get("/getequipmentById/:id", equipmentCtrl.getequipmentById);

  // Update equipment
  router.put("/updateequipment/:id", equipmentCtrl.updateequipment);

  // Delete equipment (Soft Delete)
  router.delete("/deleteequipment/:id", equipmentCtrl.deleteequipment);

  // Get equipment by project ID
  router.get("/getequipmentByprojectId/:id", equipmentCtrl.getequipmentByprojectId);


  // Get equipment_history all
  router.get("/getAllequipments_history", equipmentCtrl.getAllequipments_history);

  router.put("/equipment_stock_transfer/:equipment_id", equipmentCtrl.equipment_stock_transfer);

};