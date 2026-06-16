const categoryCtrl = require("../controller/category_controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

module.exports = (router) => {

    // Create Category
    router.post("/createCategory",checkPermission("category", "can_create"), categoryCtrl.createCategory);

    // Get all categories
    router.get("/getAllCategory", checkPermission("category", "can_read"), categoryCtrl.getAllCategory);

    // Get category by ID
    router.get("/getCategoryById/:id", checkPermission("category", "can_read"), categoryCtrl.getCategoryById);

    // Update category
    router.put("/updateCategory/:id", checkPermission("category", "can_update"), categoryCtrl.updateCategory);

    // Update category ny id
    router.put("/updateCategorybyid/:id", checkPermission("category", "can_update"), categoryCtrl.updateCategorybyid);

    // Delete category (Soft Delete)
    router.delete("/deleteCategory/:id", checkPermission("category", "can_delete"), categoryCtrl.deleteCategory);

    router.get("/getCategoryandtypeById/:id", checkPermission("category", "can_read"), categoryCtrl.getCategoryandtypeById);
};