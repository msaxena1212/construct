const material_masterCtrl = require("../controllers/material_master.controller");
const checkPermission = require("../../../core/middleware/permission.middleware"); 

module.exports = (router) => {

    // Create Material
    router.post("/createMaterial_Master",checkPermission("material", "can_create"),  material_masterCtrl.createMaterial_Master);

    // Get all materials
    router.get("/getAllMaterial_Master", checkPermission("material", "can_read"), material_masterCtrl.getAllMaterial_Master);

    // Get material by ID
    router.get("/getMaterial_MasterById/:id", checkPermission("material", "can_read"), material_masterCtrl.getMaterial_MasterById);

    // Update material
    router.put("/updateMaterial_Master/:id", checkPermission("material", "can_update"), material_masterCtrl.updateMaterial_Master);

    // Delete material (Soft Delete)
    router.delete("/deleteMaterial_Master/:id", checkPermission("material", "can_delete"), material_masterCtrl.deleteMaterial_Master);

};