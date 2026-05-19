const quotationCtrl = require("../controllers/quotation.controller");

module.exports = (router) => {

    // =========================================
    // CREATE QUOTATION
    // =========================================
    router.post("/create_quotation", quotationCtrl.create_quotation);

    router.post("/update_approval_quotation_status/:id", quotationCtrl.update_approval_quotation_status);



    // Create Multiple Quotations
    router.post("/create_multiple_quotation", quotationCtrl.create_multiple_quotation);


    // =========================================
    // GET ALL QUOTATIONS
    // =========================================
    router.get("/getall_quotation", quotationCtrl.getall_quotation);

    // Get Quotation By ID
    router.get("/getbyid_quotation/:id", quotationCtrl.getbyid_quotation);


    // =========================================
    // UPDATE QUOTATION
    // =========================================
    router.put("/update_quotation/:id", quotationCtrl.update_quotation);


    // =========================================
    // DELETE QUOTATION (SOFT DELETE)
    // =========================================
    router.delete("/delete_quotation/:id", quotationCtrl.delete_quotation);


    // =========================================
    // GET QUOTATION BY MATERIAL MASTER ID
    // =========================================
    router.get(
        "/get_quotation_by_material_master_id/:material_master_id",
        quotationCtrl.get_quotation_by_material_master_id
    );


    // =========================================
    // GET QUOTATION BY EQUIPMENT MASTER ID
    // =========================================
    router.get(
        "/get_quotation_by_equipment_master_id/:equipment_master_id",
        quotationCtrl.get_quotation_by_equipment_master_id
    );


    // =========================================
    // MATERIAL QUOTATION APIs
    // =========================================

    // Get All Material Quotations
    router.get(
        "/getall_material_quotation",
        quotationCtrl.getall_material_quotation
    );

    // Get Material Quotation By ID
    router.get(
        "/get_material_quotation_by_id/:id",
        quotationCtrl.get_material_quotation_by_id
    );


    // =========================================
    // EQUIPMENT QUOTATION APIs
    // =========================================

    // Get All Equipment Quotations
    router.get(
        "/getall_equipment_quotation",
        quotationCtrl.getall_equipment_quotation
    );

    // Get Equipment Quotation By ID
    router.get(
        "/get_equipment_quotation_by_id/:id",
        quotationCtrl.get_equipment_quotation_by_id
    );

};