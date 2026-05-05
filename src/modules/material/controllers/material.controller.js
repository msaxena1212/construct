const db = require("../../../models");

class MaterialController {
  constructor() {
    this.createMaterial = this.createMaterial.bind(this);
    this.getAllMaterials = this.getAllMaterials.bind(this);
    this.getMaterialById = this.getMaterialById.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
  }

  /**
   * Create Material
   */
  async createMaterial(req, res) {
    try {
      const {
        name,
        sku,
        category,
        icon,
        bg,
        text,
        border,
        // stock,
        stockCurrent,
        stockTotal,
        stockPercent,
        cost,
        supplier,
        status,
        vendor_id
      } = req.body;

      const company_id = req.user.company_id;

      if (!name || !sku) {
        return res.status(400).json({ message: "Name and SKU are required." });
      }

      if (!category || !supplier) {
        return res.status(400).json({ message: "Category and Supplier are required." });
      }

      if (!stockCurrent || !stockTotal) {
        return res.status(400).json({ message: "stockCurrent and stockTotal are required." });
      }

      if (!cost) {
        return res.status(400).json({ message: "Cost are required." });
      }

      const material = await db.material.create({
        name,
        sku,
        category,
        icon,
        bg,
        text,
        border,

        // 👉 stock flatten
        // stockCurrent: stock?.current || 0,
        // stockTotal: stock?.total || 0,
        // stockPercent: stock?.percent || 0,

        stockCurrent,
        stockTotal,
        stockPercent,

        cost,
        supplier,
        status,
        company_id,
        vendor_id
      });

      res.status(201).json({
        message: "Material created successfully.",
        data: material
      });

    } catch (error) {
      console.error("[CREATE_MATERIAL_ERROR]", error);
      res.status(500).json({
        message: "Error creating material.",
        error: error.message
      });
    }
  }

  /**
   * Get All Materials
   */
  async getAllMaterials(req, res) {
    try {

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const materials = await db.material.findAll({
        where: { isDeleted: false, company_id },
        order: [['createdAt', 'DESC']]
      });

      //     res.status(200).json({ data: materials });

      //   } catch (error) {
      //     console.error("[GET_ALL_MATERIALS_ERROR]", error);
      //     res.status(500).json({
      //       message: "Error fetching materials.",
      //       error: error.message
      //     });
      //   }
      // }
      if (materials.length > 0) {
        return res
          .status(200)
          .send({ code: 200, message: "Success", data: materials });
      } else {
        return res.status(404).send({ code: 404, message: "No data found" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ code: 500, message: error.message || "Server Error" });
    }
  };

  /**
   * Get Material By ID
   */
  async getMaterialById(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const material = await db.material.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!material) {
        return res.status(404).json({ message: "Material not found." });
      }

      res.status(200).json({ data: material });

    } catch (error) {
      console.error("[GET_MATERIAL_BY_ID_ERROR]", error);
      res.status(500).json({
        message: "Error fetching material.",
        error: error.message
      });
    }
  }

  /**
   * Update Material
   */
  async updateMaterial(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const material = await db.material.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!material) {
        return res.status(404).json({ message: "Material not found." });
      }

      const {
        name,
        sku,
        category,
        icon,
        bg,
        text,
        border,
        // stock,
        stockCurrent,
        stockTotal,
        stockPercent,
        cost,
        supplier,
        status,
        vendor_id
      } = req.body;

      await material.update({
        name,
        sku,
        category,
        icon,
        bg,
        text,
        border,

        // stockCurrent: stock?.current ?? material.stockCurrent,
        // stockTotal: stock?.total ?? material.stockTotal,
        // stockPercent: stock?.percent ?? material.stockPercent,

        stockCurrent,
        stockTotal,
        stockPercent,

        cost,
        supplier,
        status,
        vendor_id
      });

      res.status(200).json({
        message: "Material updated successfully.",
        data: material
      });

    } catch (error) {
      console.error("[UPDATE_MATERIAL_ERROR]", error);
      res.status(500).json({
        message: "Error updating material.",
        error: error.message
      });
    }
  }

  /**
   * Delete Material (Soft Delete)
   */
  async deleteMaterial(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const material = await db.material.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!material) {
        return res.status(404).json({ message: "Material not found." });
      }

      await material.update({ isDeleted: true });

      res.status(200).json({
        message: "Material deleted successfully."
      });

    } catch (error) {
      console.error("[DELETE_MATERIAL_ERROR]", error);
      res.status(500).json({
        message: "Error deleting material.",
        error: error.message
      });
    }
  }
}

module.exports = new MaterialController();