const material_masterCtrl = require("../controllers/material_master.controller");

module.exports = (router) => {

  // Create Material
  router.post("/createMaterial_Master", material_masterCtrl.createMaterial_Master);

  // Get all materials
  router.get("/getAllMaterial_Master", material_masterCtrl.getAllMaterial_Master);

  // Get material by ID
  router.get("/getMaterial_MasterById/:id", material_masterCtrl.getMaterial_MasterById);

  // Update material
  router.put("/updateMaterial_Master/:id", material_masterCtrl.updateMaterial_Master);

  // Delete material (Soft Delete)
  router.delete("/deleteMaterial_Master/:id", material_masterCtrl.deleteMaterial_Master);

};