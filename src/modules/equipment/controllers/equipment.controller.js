const db = require("../../../models");

class equipmentController {
  constructor() {
    this.createequipment = this.createequipment.bind(this);
    this.getAllequipments = this.getAllequipments.bind(this);
    this.getequipmentById = this.getequipmentById.bind(this);
    this.updateequipment = this.updateequipment.bind(this);
    this.deleteequipment = this.deleteequipment.bind(this);
    this.getequipmentByprojectId = this.getequipmentByprojectId.bind(this);
    this.getAllequipments_history = this.getAllequipments_history.bind(this);
    this.equipment_stock_transfer = this.equipment_stock_transfer.bind(this);
  }

  async createequipment(req, res) {
    try {
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
        equipment_master_id
      } = req.body;

      const company_id = req.user.company_id;

      if (!vendor_name) {
        return res.status(400).json({ message: "vendor_name are required." });
      }

      if (!stockIn) {
        return res.status(400).json({ message: "stockIn are required." });
      }

      if (!cost) {
        return res.status(400).json({ message: "Cost are required." });
      }

      const equipment = await db.equipment.findOne({
        where: { isDeleted: false, company_id, equipment_master_id }
      });

      if (equipment) {
        await equipment.update({
          name,
          sku,
          category,
          stockIn: Number(equipment.stockIn) + Number(stockIn),
          vendor_name,
          stockUsed,
          cost,
          status,
          vendor_id,
          equipment_master_id
        });

        const existingequipment = await db.equipment_master.findOne({
          where: { id: equipment_master_id }
        });

        const updatedStock = Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          { stockAvailable: updatedStock },
          { where: { id: equipment_master_id } }
        );

        await db.equipment_history.create({
          name,
          sku,
          category,
          stockIn,
          cost,
          vendor_name,
          equipment_id: equipment.id,
          equipment_master_id,
          company_id,
          stockUsed,
          vendor_id,
          status: "UPDATED",
          user_id: req.user.id,
        });

        return res.status(201).json({
          message: "equipment Updated successfully.",
          data: equipment
        });

      } else {

        const newEquipment = await db.equipment.create({
          name,
          sku,
          category,
          stockIn,
          vendor_name,
          stockUsed,
          stockRemaining: stockIn,
          cost,
          status,
          vendor_id,
          equipment_master_id,
          company_id
        });

        const existingequipment = await db.equipment_master.findOne({
          where: { id: equipment_master_id }
        });

        const updatedStock = Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          { stockAvailable: updatedStock },
          { where: { id: equipment_master_id } }
        );

        await db.equipment_history.create({
          name,
          sku,
          category,
          stockIn,
          cost,
          vendor_name,
          stockUsed,
          equipment_id: newEquipment.id,
          equipment_master_id,
          company_id,
          vendor_id,
          status: "CREATED",
          user_id: req.user.id,
        });

        return res.status(201).json({
          message: "equipment created successfully.",
          data: newEquipment
        });
      }

    } catch (error) {
      console.error("[CREATE_equipment_ERROR]", error);
      res.status(500).json({
        message: "Error creating equipment.",
        error: error.message
      });
    }
  }

  async getAllequipments(req, res) {
    try {

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const equipments = await db.equipment.findAll({
        where: { isDeleted: false, company_id },
        include: [
          {
            model: db.equipment_project_stock,
            as: "equipment_project_stock"
          }
        ],
        order: [['createdAt', 'DESC']]
      });


      if (equipments.length > 0) {
        return res
          .status(200)
          .send({ code: 200, message: "Success", data: equipments });
      } else {
        return res.status(404).send({ code: 404, message: "No data found" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ code: 500, message: error.message || "Server Error" });
    }
  };

  async getequipmentById(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const equipment = await db.equipment.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!equipment) {
        return res.status(404).json({ message: "equipment not found." });
      }

      res.status(200).json({ data: equipment });

    } catch (error) {
      console.error("[GET_equipment_BY_ID_ERROR]", error);
      res.status(500).json({
        message: "Error fetching equipment.",
        error: error.message
      });
    }
  }

  async updateequipment(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const equipment = await db.equipment.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!equipment) {
        return res.status(404).json({ message: "equipment not found." });
      }

      const {
        name,
        sku,
        category,
        vendor_name,
        cost,
        status,
        vendor_id,
        equipment_master_id,
        stockUsed,
        stockIn,
        quotation_id
      } = equipment;

      const { projects } = req.body;

      const totalUsedStock = projects.reduce((sum, item) => {
        return sum + Number(item.stock || 0);
      }, 0);

      await db.equipment.update(
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

          const existingProjectStock = await db.equipment_project_stock.findOne({
            where: {
              equipment_id: id,
              project_id: project.project_id
            }
          });

          let projectStockData;

          if (existingProjectStock) {

            const updatedStock =
              Number(existingProjectStock.stockUsed || 0) +
              Number(project.stock || 0);

            await existingProjectStock.update({
              stockUsed: updatedStock,

            });

            projectStockData = existingProjectStock;

          } else {

            projectStockData = await db.equipment_project_stock.create({
              equipment_id: id,
              project_id: project.project_id,
              name,
              sku,
              category,
              vendor_name,
              stockUsed: project.stock,
              cost,
              status: project.status,
              vendor_id,
              equipment_master_id,
              project_name: project.project_name,
              quotation_id,
              company_id
            });
          }

          await db.equipment_history.create({
            name,
            sku,
            category,
            stockIn,
            stockUsed: project.stock,
            cost,
            vendor_name,
            project_name: project.project_name,
            equipment_id: equipment.id,
            equipment_master_id,
            company_id,
            project_id: project.project_id,
            vendor_id,
            quotation_id,
            status: "UPDATED",
            user_id: req.user.id,
          });

          await db.equipment_project_stock_history.create({
            equipment_project_stock_id: projectStockData.id,
            equipment_id: id,
            project_id: project.project_id,
            name,
            sku,
            category,
            vendor_name,
            stockUsed: project.stock,
            cost,
            status: project.status,
            vendor_id,
            equipment_master_id,
            project_name: project.project_name,
            quotation_id,
            company_id
          });

          return projectStockData;
        })
      );

      res.status(200).json({
        message: "equipment updated successfully.",
        data: equipment
      });

    } catch (error) {
      console.error("[UPDATE_equipment_ERROR]", error);
      res.status(500).json({
        message: "Error updating equipment.",
        error: error.message
      });
    }
  }

  async deleteequipment(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const equipment = await db.equipment.findOne({
        where: { id, isDeleted: false, company_id }
      });

      if (!equipment) {
        return res.status(404).json({ message: "equipment not found." });
      }

      await equipment.update({ isDeleted: true });

      res.status(200).json({
        message: "equipment deleted successfully."
      });

    } catch (error) {
      console.error("[DELETE_equipment_ERROR]", error);
      res.status(500).json({
        message: "Error deleting equipment.",
        error: error.message
      });
    }
  }

  async getequipmentByprojectId(req, res) {
    try {
      const { id } = req.params;

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }


      const equipment = await db.equipment.findOne({
        where: { project_id: id, isDeleted: false, company_id }
      });

      if (!equipment) {
        return res.status(404).json({ message: "equipment not found." });
      }

      res.status(200).json({ data: equipment });

    } catch (error) {
      console.error("[GET_equipment_BY_ID_ERROR]", error);
      res.status(500).json({
        message: "Error fetching equipment.",
        error: error.message
      });
    }
  }

  async getAllequipments_history(req, res) {
    try {

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const equipments = await db.equipment_history.findAll({
        where: { isDeleted: false, company_id },
        include: [
          {
            model: db.user,
            as: "user",
            attributes: ["id", "firstname", "lastname"]
          }
        ],
        order: [['createdAt', 'DESC']]
      });


      if (equipments.length > 0) {
        return res
          .status(200)
          .send({ code: 200, message: "Success", data: equipments });
      } else {
        return res.status(404).send({ code: 404, message: "No data found" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ code: 500, message: error.message || "Server Error" });
    }
  };

  async equipment_stock_transfer(req, res) {
    try {

      const { equipment_id } = req.params;

      const { note, transfers } = req.body;

      const company_id = req.user.company_id;

      const equipment = await db.equipment.findOne({
        where: {
          id: equipment_id,
          isDeleted: false,
          company_id
        }
      });

      if (!equipment) {
        return res.status(404).json({
          message: "Equipment not found."
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
        equipment_master_id,
        quotation_id
      } = equipment;

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

        const fromStock = await db.equipment_project_stock.findOne({
          where: {
            equipment_id,
            project_id: from_project_id,
            company_id
          }
        });

        if (!fromStock) {
          return res.status(404).json({
            message: `Source project stock not found`
          });
        }

        if (Number(fromStock.stockUsed) < Number(quantity)) {
          return res.status(400).json({
            message: `Insufficient stock in source project`
          });
        }

        const updatedFromStock =
          Number(fromStock.stockUsed) - Number(quantity);

        await fromStock.update({
          stockUsed: updatedFromStock
        });

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

        const [toStock, created] =
          await db.equipment_project_stock.findOrCreate({

            where: {
              equipment_id,
              project_id: to_project_id,
              company_id
            },

            defaults: {
              equipment_id,
              project_id: to_project_id,
              name,
              sku,
              category,
              vendor_name,
              stockUsed: quantity,
              cost,
              status: "ASSIGNED",
              vendor_id,
              equipment_master_id,
              project_name: projectData.name,
              quotation_id,
              company_id
            }

          });

        if (!created) {

          const updatedToStock =
            Number(toStock.stockUsed) + Number(quantity);

          await toStock.update({
            stockUsed: updatedToStock
          });
        }

        await db.equipment_history.create({
          name,
          sku,
          category,
          stockUsed: quantity,
          cost,
          vendor_name,
          equipment_id,
          equipment_master_id,
          company_id,
          project_id: to_project_id,
          vendor_id,
          project_name: projectData.name,
          status: "TRANSFER",
          note,
          user_id: req.user.id,
        });

      }

      return res.status(200).json({
        message: "Equipment stock transferred successfully"
      });

    } catch (error) {

      console.log("[EQUIPMENT_STOCK_TRANSFER_ERROR]", error);

      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  }

}

module.exports = new equipmentController();