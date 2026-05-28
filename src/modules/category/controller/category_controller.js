const db = require("../../../models");

class CategoryController {
  constructor() {
    this.createCategory = this.createCategory.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getCategoryandtypeById = this.getCategoryandtypeById.bind(this);

  }

  /**
   * Create Category
   */
  async createCategory(req, res) {
    try {

      const {
        category_name,
        category_type,
        status
      } = req.body;

      const company_id = req.user.company_id;

      // Validation
      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      if (!category_name) {
        return res.status(400).json({
          message: "category_name is required."
        });
      }

      // Duplicate Check
      const existingCategory = await db.category.findOne({
        where: {
          category_name,
          category_type,
          company_id,
          isDeleted: false
        }
      });

      if (existingCategory) {
        return res.status(409).json({
          message: "Category already exists."
        });
      }

      // Create Category
      const category = await db.category.create({
        category_name,
        category_type,
        status,
        company_id
      });

      return res.status(201).json({
        message: "Category created successfully.",
        data: category
      });

    } catch (error) {

      console.error("[CREATE_CATEGORY_ERROR]", error);

      return res.status(500).json({
        message: "Error creating category.",
        error: error.message
      });
    }
  }

  /**
   * Get All Categories
   */
  async getAllCategory(req, res) {
    try {

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const categories = await db.category.findAll({
        where: {
          isDeleted: false,
          company_id
        },
        order: [["createdAt", "DESC"]]
      });

      if (categories.length > 0) {

        return res.status(200).send({
          code: 200,
          message: "Success",
          data: categories
        });

      } else {

        return res.status(404).send({
          code: 404,
          message: "No data found"
        });
      }

    } catch (error) {

      console.error("[GET_ALL_CATEGORY_ERROR]", error);

      return res.status(500).send({
        code: 500,
        message: error.message || "Server Error"
      });
    }
  }

  /**
   * Get Category By ID
   */
  async getCategoryById(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const category = await db.category.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found."
        });
      }

      return res.status(200).json({
        data: category
      });

    } catch (error) {

      console.error("[GET_CATEGORY_BY_ID_ERROR]", error);

      return res.status(500).json({
        message: "Error fetching category.",
        error: error.message
      });
    }
  }

  /**
   * Update Category
   */
  async updateCategory(req, res) {
    try {

      const { id } = req.params;

      const {
        category_name,
        category_type,
        status
      } = req.body;

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const category = await db.category.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found."
        });
      }

      // Duplicate Check
      if (category_name) {

        const existingCategory = await db.category.findOne({
          where: {
            category_name,
            company_id,
            isDeleted: false
          }
        });

        if (
          existingCategory &&
          existingCategory.id !== Number(id)
        ) {
          return res.status(409).json({
            message: "Category already exists."
          });
        }
      }

      await category.update({
        category_name,
        category_type,
        status
      });

      return res.status(200).json({
        message: "Category updated successfully.",
        data: category
      });

    } catch (error) {

      console.error("[UPDATE_CATEGORY_ERROR]", error);

      return res.status(500).json({
        message: "Error updating category.",
        error: error.message
      });
    }
  }


  /**
 * Update Category
 */
  async updateCategorybyid(req, res) {
    try {

      const { id } = req.params;

      const {
        category_name,
        category_type,
        status
      } = req.body;

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const category = await db.category.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found."
        });
      }

      // Duplicate Check
      if (category_name) {

        const existingCategory = await db.category.findOne({
          where: {
            category_name,
            company_id,
            isDeleted: false
          }
        });

        if (
          existingCategory &&
          existingCategory.id !== Number(id)
        ) {
          return res.status(409).json({
            message: "Category already exists."
          });
        }
      }

      await category.update({
        category_name,
        category_type,
        status
      });

      return res.status(200).json({
        message: "Category updated successfully.",
        data: category
      });

    } catch (error) {

      console.error("[UPDATE_CATEGORY_ERROR]", error);

      return res.status(500).json({
        message: "Error updating category.",
        error: error.message
      });
    }
  }


  /**
   * Delete Category (Soft Delete)
   */
  async deleteCategory(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const category = await db.category.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found."
        });
      }

      await category.update({
        isDeleted: true
      });

      return res.status(200).json({
        message: "Category deleted successfully."
      });

    } catch (error) {

      console.error("[DELETE_CATEGORY_ERROR]", error);

      return res.status(500).json({
        message: "Error deleting category.",
        error: error.message
      });
    }
  }

  async getCategoryandtypeById(req, res) {
    try {

      const { id } = req.params;

      const company_id = req.user.company_id;

      if (!company_id) {
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const category = await db.category.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found."
        });
      }

      return res.status(200).json({
        data: category
      });

    } catch (error) {

      console.error("[GET_CATEGORY_BY_ID_ERROR]", error);

      return res.status(500).json({
        message: "Error fetching category.",
        error: error.message
      });
    }
  }


}

module.exports = new CategoryController();