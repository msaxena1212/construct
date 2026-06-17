const equipment_masterCtrl = require("../controllers/equipment_master.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

module.exports = (router) => {

    // Create equipment
    router.post("/createequipment_Master", checkPermission("equipment", "can_create"), equipment_masterCtrl.createequipment_Master);

    // Get all equipments
    router.get("/getAllequipment_Master", checkPermission("equipment", "can_read"),equipment_masterCtrl.getAllequipment_Master);

    // Get equipment by ID
    router.get("/getequipment_MasterById/:id", checkPermission("equipment", "can_read"),equipment_masterCtrl.getequipment_MasterById);

    // Update equipment
    router.put("/updateequipment_Master/:id", checkPermission("equipment", "can_update"),equipment_masterCtrl.updateequipment_Master);

    // Delete equipment (Soft Delete)
    router.delete("/deleteequipment_Master/:id",checkPermission("equipment", "can_delete"),  equipment_masterCtrl.deleteequipment_Master);

};