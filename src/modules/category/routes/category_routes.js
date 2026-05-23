const categoryCtrl = require("../controller/category_controller");

module.exports = (router) => {

    // Create Category
    router.post("/createCategory", categoryCtrl.createCategory);

    // Get all categories
    router.get("/getAllCategory", categoryCtrl.getAllCategory);

    // Get category by ID
    router.get("/getCategoryById/:id", categoryCtrl.getCategoryById);

    // Update category
    router.put("/updateCategory/:id", categoryCtrl.updateCategory);

    // Delete category (Soft Delete)
    router.delete("/deleteCategory/:id", categoryCtrl.deleteCategory);

};