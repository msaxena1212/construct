const quotationCtrl = require("../controllers/quotation.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");
module.exports = (router) => {

    // =========================================
    // CREATE QUOTATION
    // =========================================
    router.post("/create_quotation", checkPermission("resources/quotations", "can_create"), quotationCtrl.create_quotation);

    router.post("/update_approval_quotation_status/:id", checkPermission("resources/quotations", "can_create"), quotationCtrl.update_approval_quotation_status);



    // Create Multiple Quotations
    router.post("/create_multiple_quotation", checkPermission("resources/quotations", "can_create"), quotationCtrl.create_multiple_quotation);


    // =========================================
    // GET ALL QUOTATIONS
    // =========================================
    router.get("/getall_quotation", checkPermission("resources/quotations", "can_read"), quotationCtrl.getall_quotation);

    // Get Quotation By ID
    router.get("/getbyid_quotation/:id", checkPermission("resources/quotations", "can_read"), quotationCtrl.getbyid_quotation);


    // =========================================
    // UPDATE QUOTATION
    // =========================================
    router.put("/update_quotation/:id", checkPermission("resources/quotations", "can_update"), quotationCtrl.update_quotation);


    // =========================================
    // DELETE QUOTATION (SOFT DELETE)
    // =========================================
    router.delete("/delete_quotation/:id", checkPermission("resources/quotations", "can_delete"), quotationCtrl.delete_quotation);


    // =========================================
    // GET QUOTATION BY MATERIAL MASTER ID
    // =========================================
    router.get(
        "/get_quotation_by_material_master_id/:material_master_id", checkPermission("resources/quotations", "can_read"),
        quotationCtrl.get_quotation_by_material_master_id
    );


    // =========================================
    // GET QUOTATION BY EQUIPMENT MASTER ID
    // =========================================
    router.get(
        "/get_quotation_by_equipment_master_id/:equipment_master_id", checkPermission("resources/quotations", "can_read"),
        quotationCtrl.get_quotation_by_equipment_master_id
    );


    // =========================================
    // MATERIAL QUOTATION APIs
    // =========================================

    // Get All Material Quotations
    router.get(
        "/getall_material_quotation", checkPermission("resources/quotations", "can_read"),
        quotationCtrl.getall_material_quotation
    );

    // Get Material Quotation By ID
    router.get(
        "/get_material_quotation_by_id/:id", checkPermission("resources/quotations", "can_read"),
        quotationCtrl.get_material_quotation_by_id
    );


    // =========================================
    // EQUIPMENT QUOTATION APIs
    // =========================================

    // Get All Equipment Quotations
    router.get(
        "/getall_equipment_quotation", checkPermission("resources/equipment-inventory", "can_read"),
        quotationCtrl.getall_equipment_quotation
    );

    // Get Equipment Quotation By ID
    router.get(
        "/get_equipment_quotation_by_id/:id", checkPermission("resources/equipment-inventory", "can_read"),
        quotationCtrl.get_equipment_quotation_by_id
    );


    router.get("/getall_material_quotation_company/:id", checkPermission("resources/materials", "can_read"), quotationCtrl.getall_material_quotation_company);




};