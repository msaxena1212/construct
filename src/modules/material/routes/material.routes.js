const materialCtrl = require("../controllers/material.controller");

module.exports = (router) => {

  // Create Material
  router.post("/createMaterial", materialCtrl.createMaterial);

  // Get all materials
  router.get("/getAllMaterials", materialCtrl.getAllMaterials);

  // Get material by ID
  router.get("/getMaterialById/:id", materialCtrl.getMaterialById);

  // Update material
  router.put("/updateMaterial/:id", materialCtrl.updateMaterial);

  // Delete material (Soft Delete)
  router.delete("/deleteMaterial/:id", materialCtrl.deleteMaterial);

};