const materialHistoryCtrl = require("../controllers/material_history.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

module.exports = (router) => {

    router.get(
        "/getAllMaterialHistory",
        checkPermission("material", "can_read"),
        materialHistoryCtrl.getAllMaterialHistory
    );

    router.get(
        "/getMaterialHistoryById/:id",
        checkPermission("material", "can_read"),
        materialHistoryCtrl.getMaterialHistoryById
    );


    router.get(
        "/getMaterialHistoryByMaterialId/:material_id",
        checkPermission("material", "can_read"),
        materialHistoryCtrl.getMaterialHistoryByMaterialId
    );

    router.get(
        "/getMaterialHistoryByMaterialMasterId/:material_master_id",
        checkPermission("material", "can_read"),
        materialHistoryCtrl.getMaterialHistoryByMaterialMasterId
    );

};