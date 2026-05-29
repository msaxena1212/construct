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
        stockUsed,
        vendor_name,
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
        where: { isDeleted: false, company_id, material_master_id }
      });

      if (material) {
        const {
          name,
          sku,
          category,
          stockIn,
          vendor_name,
          stockUsed,
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
          stockUsed,
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
          material_id: material.id,
          material_master_id,
          company_id,
          stockUsed,
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
          stockUsed,
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
          stockUsed,
          material_id: material.id,
          material_master_id,
          company_id,
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
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const materials = await db.material.findAll({
        where: {
          isDeleted: false,
          company_id
        },

        include: [
          {
            model: db.material_project_stock,
            as: "material_project_stock"
          }
        ],

        order: [['createdAt', 'DESC']]
      });

      if (materials.length > 0) {
        return res.status(200).send({
          code: 200,
          message: "Success",
          data: materials
        });
      } else {
        return res.status(404).send({
          code: 404,
          message: "No data found"
        });
      }

    } catch (error) {

      return res.status(500).send({
        code: 500,
        message: error.message || "Server Error"
      });

    }
  }

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
        return res.status(401).json({
          message: "Unauthorized. Company context missing."
        });
      }

      const material = await db.material.findOne({
        where: {
          id,
          isDeleted: false,
          company_id
        }
      });

      if (!material) {
        return res.status(404).json({
          message: "Material not found."
        });
      }

      const {
        name,
        sku,
        category,
        vendor_name,
        cost,
        status,
        vendor_id,
        material_master_id,
        stockUsed,
        stockIn,
        quotation_id
      } = material;

      const { projects } = req.body;

      // total assigned stock
      const totalUsedStock = projects.reduce((sum, item) => {
        return sum + Number(item.stock || 0);
      }, 0);

      // update material table stockUsed
      await db.material.update(
        {
          stockUsed: Number(stockUsed || 0) + totalUsedStock,
          stockRemaining: stockIn - (Number(stockUsed || 0) + totalUsedStock)
        },
        {
          where: {
            id,
            company_id
          }
        }
      );

      const project_multiple = await Promise.all(
        projects.map(async (project) => {

          // Check existing record by material_id + project_id
          const existingProjectStock = await db.material_project_stock.findOne({
            where: {
              material_id: id,
              project_id: project.project_id
            }
          });

          let projectStockData;

          if (existingProjectStock) {

            // Add old stock + new stock
            const updatedStock =
              Number(existingProjectStock.stockUsed || 0) +
              Number(project.stock || 0);

            // Update existing record
            await existingProjectStock.update({
              stockUsed: updatedStock
            });

            projectStockData = existingProjectStock;

          } else {

            // Create new record
            projectStockData = await db.material_project_stock.create({
              material_id: id,
              project_id: project.project_id,
              name,
              sku,
              category,
              vendor_name,
              stockUsed: project.stock,
              cost,
              status: project.status,
              vendor_id,
              material_master_id,
              project_name: project.project_name,
              quotation_id,
              company_id
            });
          }

          // Material history create
          await db.material_history.create({
            name,
            sku,
            category,
            stockIn,
            stockUsed: project.stock,
            cost,
            vendor_name,
            project_name: project.project_name,
            material_id: material.id,
            material_master_id,
            company_id,
            project_id: project.project_id,
            vendor_id,
            status: "UPDATED",
          });

          return projectStockData;
        })
      );


      // ================= CREATE HISTORY =================
      // await db.material_history.create({
      //   name,
      //   sku,
      //   category,
      //   stockIn,
      //   cost,
      //   vendor_name,
      //   material_id: material.id,
      //   material_master_id,
      //   company_id,
      //   stockUsed,
      //   vendor_id,
      //   status: "UPDATED",

      // });


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


      const material = await db.material_project_stock.findOne({
        where: { project_id: id, isDeleted: false, company_id }
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
   * MATERIAL STOCK TRANSFER API
   */
  async material_stock_transfer(req, res) {
    try {

      const { material_id } = req.params;

      const { note, transfers } = req.body;

      const company_id = req.user.company_id;

      // Check material exists
      const material = await db.material.findOne({
        where: {
          id: material_id,
          isDeleted: false,
          company_id
        }
      });

      if (!material) {
        return res.status(404).json({
          message: "Material not found."
        });
      }

      const {
        name,
        sku,
        category,
        vendor_name,
        cost,
        status,
        vendor_id,
        material_master_id,
        quotation_id
      } = material;

      // Validate transfers
      if (!transfers || !Array.isArray(transfers) || transfers.length === 0) {
        return res.status(400).json({
          message: "Transfers data is required"
        });
      }

      for (const item of transfers) {

        const {
          from_project_id,
          to_project_id,
          quantity
        } = item;

        // Source stock
        const fromStock = await db.material_project_stock.findOne({
          where: {
            material_id,
            project_id: from_project_id,
            company_id
          }
        });

        if (!fromStock) {
          return res.status(404).json({
            message: `Source project stock not found`
          });
        }

        // Check stock
        if (Number(fromStock.stockUsed) < Number(quantity)) {
          return res.status(400).json({
            message: `Insufficient stock in source project`
          });
        }

        // Deduct stock from source
        const updatedFromStock =
          Number(fromStock.stockUsed) - Number(quantity);

        await fromStock.update({
          stockUsed: updatedFromStock
        });

        // Destination project data
        const projectData = await db.project.findOne({
          where: {
            id: to_project_id,
            company_id
          }
        });

        if (!projectData) {
          return res.status(404).json({
            message: "Destination project not found"
          });
        }

        // Find or create destination stock
        const [toStock, created] =
          await db.material_project_stock.findOrCreate({

            where: {
              material_id,
              project_id: to_project_id,
              company_id
            },

            defaults: {
              material_id,
              project_id: to_project_id,
              name,
              sku,
              category,
              vendor_name,
              stockUsed: quantity,
              cost,
              status: "ASSIGNED",
              vendor_id,
              material_master_id,
              project_name: projectData.name,
              quotation_id,
              company_id
            }

          });

        // If already exists then update stock
        if (!created) {

          const updatedToStock =
            Number(toStock.stockUsed) + Number(quantity);

          await toStock.update({
            stockUsed: updatedToStock
          });
        }

        // Create history
        await db.material_history.create({
          name,
          sku,
          category,
          stockUsed: quantity,
          cost,
          vendor_name,
          material_id,
          material_master_id,
          company_id,
          project_id: to_project_id,
          vendor_id,
          project_name: projectData.project_name,
          status: "TRANSFER",
          note
        });

      }

      return res.status(200).json({
        message: "Stock transferred successfully"
      });

    } catch (error) {

      console.log("[MATERIAL_STOCK_TRANSFER_ERROR]", error);

      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

}

module.exports = new MaterialController();