const equipment_masterCtrl = require("../controllers/equipment_master.controller");

module.exports = (router) => {

    // Create equipment
    router.post("/createequipment_Master", equipment_masterCtrl.createequipment_Master);

    // Get all equipments
    router.get("/getAllequipment_Master", equipment_masterCtrl.getAllequipment_Master);

    // Get equipment by ID
    router.get("/getequipment_MasterById/:id", equipment_masterCtrl.getequipment_MasterById);

    // Update equipment
    router.put("/updateequipment_Master/:id", equipment_masterCtrl.updateequipment_Master);

    // Delete equipment (Soft Delete)
    router.delete("/deleteequipment_Master/:id", equipment_masterCtrl.deleteequipment_Master);

};