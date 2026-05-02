const materialCtrl = require("../controllers/material.controller");

module.exports = (router) => {

  // Create Material
  router.post("/api/v1/createMaterial", materialCtrl.createMaterial);

  // Get all materials
  router.get("/api/v1/getAllMaterials", materialCtrl.getAllMaterials);

  // Get material by ID
  router.get("/api/v1/getMaterialById/:id", materialCtrl.getMaterialById);

  // Update material
  router.put("/api/v1/updateMaterial/:id", materialCtrl.updateMaterial);

  // Delete material (Soft Delete)
  router.delete("/api/v1/deleteMaterial/:id", materialCtrl.deleteMaterial);

};