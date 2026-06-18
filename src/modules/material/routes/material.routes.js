const materialCtrl = require("../controllers/material.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");  

module.exports = (router) => {

  // Create Material
  router.post("/createMaterial", checkPermission("material", "can_create"), materialCtrl.createMaterial);

  // Get all materials
  router.get("/getAllMaterials",checkPermission("material", "can_read"),  materialCtrl.getAllMaterials);

  // Get material by ID
  router.get("/getMaterialById/:id", checkPermission("material", "can_read"), materialCtrl.getMaterialById);

  // Update material
  router.put("/updateMaterial/:id", checkPermission("material", "can_update"), materialCtrl.updateMaterial);

  // Delete material (Soft Delete)
  router.delete("/deleteMaterial/:id",checkPermission("material", "can_delete"),  materialCtrl.deleteMaterial);

  // Get material by project ID
  router.get("/getMaterialByprojectId/:id",checkPermission("material", "can_read"), materialCtrl.getMaterialByprojectId);


  router.put("/material_stock_transfer/:material_id",checkPermission("material", "can_update"),  materialCtrl. material_stock_transfer);

};