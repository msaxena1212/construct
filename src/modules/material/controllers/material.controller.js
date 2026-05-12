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
        stockIn,
        vendor_name,
        project_name,
        project_id,
        cost,
        status,
        vendor_id,
        material_master_id
      } = req.body;

      const company_id = req.user.company_id;

      // if (!material_master_id) {
      //   return res.status(400).json({ message: "Material are required." });
      // }

      if (!vendor_name) {
        return res.status(400).json({ message: "vendor_name are required." });
      }

      if (!stockIn) {
        return res.status(400).json({ message: "stockIn are required." });
      }

      if (!cost) {
        return res.status(400).json({ message: "Cost are required." });
      }


      const material = await db.material.findOne({
        where: { isDeleted: false, company_id, project_id, material_master_id }
      });

      if (material) {
        const {
          name,
          sku,
          category,
          stockIn,
          vendor_name,
          project_name,
          project_id,
          cost,
          status,
          vendor_id,
          material_master_id,
        } = req.body;

        await material.update({
          name,
          sku,
          category,
          stockIn: Number(material.stockIn) + Number(stockIn),
          vendor_name,
          project_name,
          project_id,
          cost,
          status,
          vendor_id,
          material_master_id
        });

        const existingMaterial = await db.material_master.findOne({
          where: {
            id: material_master_id
          }
        });

        const updatedStock =
          Number(existingMaterial.stockAvailable) + Number(stockIn);

        await db.material_master.update(
          {
            stockAvailable: updatedStock
          },
          {
            where: {
              id: material_master_id
            }
          }
        );

         
      // ================= CREATE HISTORY =================
      await db.material_history.create({
        name,
        sku,
        category,
        stockIn,
        cost,
        vendor_name,
        project_name,
        material_id: material.id,
        material_master_id,
        company_id,
        project_id,
        vendor_id,
        status: "UPDATED",

      });

        res.status(201).json({
          message: "Material Updated successfully.",
          data: material
        });



      }

      else {

        const material = await db.material.create({
          name,
          sku,
          category,
          stockIn,
          vendor_name,
          project_name,
          project_id,
          cost,
          status,
          vendor_id,
          material_master_id,
          company_id
        });

        const existingMaterial = await db.material_master.findOne({
          where: {
            id: material_master_id
          }
        });

        const updatedStock =
          Number(existingMaterial.stockAvailable) + Number(stockIn);

        await db.material_master.update(
          {
            stockAvailable: updatedStock
          },
          {
            where: {
              id: material_master_id
            }
          }
        );

      // ================= CREATE HISTORY =================

      await db.material_history.create({
        name,
        sku,
        category,
        stockIn,
        cost,
        vendor_name,
        project_name,
        material_id: material.id,
        material_master_id,
        company_id,
        project_id,
        vendor_id,
        status: "CREATED",

      });

        res.status(201).json({
          message: "Material created successfully.",
          data: material
        });

      }

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
        stockIn,
        vendor_name,
        project_name,
        project_id,
        cost,
        status,
        vendor_id,
        material_master_id,
      } = req.body;

      await material.update({
        name,
        sku,
        category,
        // stockIn: Number(material.stockIn) + Number(stockIn),
        vendor_name,
        project_name,
        project_id,
        cost,
        status,
        vendor_id,
        material_master_id
      });

      // const existingMaterial = await db.material_master.findOne({
      //   where: {
      //     id: material_master_id
      //   }
      // });

      // const updatedStock =
      //   Number(existingMaterial.stockAvailable) + Number(stockIn);

      // await db.material_master.update(
      //   {
      //     stockAvailable: updatedStock
      //   },
      //   {
      //     where: {
      //       id: material_master_id
      //     }
      //   }
      // );

            // ================= CREATE HISTORY =================
      await db.material_history.create({
        name,
        sku,
        category,
        stockIn,
        cost,
        vendor_name,
        project_name,
        material_id: material.id,
        material_master_id,
        company_id,
        project_id,
        vendor_id,
        status: "UPDATED",

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

  async getMaterialByprojectId(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const material = await db.material.findOne({
        where: { project_id:id, isDeleted: false, company_id }
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



}

module.exports = new MaterialController();