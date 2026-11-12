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

      if (!equipment_master_id) {
        return res.status(400).json({ message: "equipment_master_id is required." });
      }

      const equipment = await db.equipment.findOne({
        where: { isDeleted: false, company_id, equipment_master_id }
      });

      if (equipment) {
        const updatedStockIn = Number(equipment.stockIn) + Number(stockIn);
        const currentStockUsed = Number(equipment.stockUsed || 0);

        await equipment.update({
          name,
          sku,
          category,
          stockIn: updatedStockIn,
          vendor_name,
          stockUsed: currentStockUsed,
          stockRemaining: updatedStockIn - currentStockUsed,
          cost,
          status,
          vendor_id,
          equipment_master_id
        });

        const existingequipment = await db.equipment_master.findOne({
          where: { id: equipment_master_id }
        });

        if (!existingequipment) {
          return res.status(404).json({ message: "Equipment master not found." });
        }

        const updatedMasterStock = Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          { stockAvailable: updatedMasterStock },
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
          stockUsed: 0,
          vendor_id,
          status: "UPDATED",
          user_id: req.user.id,
        });

        return res.status(201).json({
          message: "equipment Updated successfully.",
          data: equipment
        });

      } else {

        const existingequipment = await db.equipment_master.findOne({
          where: { id: equipment_master_id }
        });

        if (!existingequipment) {
          return res.status(404).json({ message: "Equipment master not found." });
        }

        const newEquipment = await db.equipment.create({
          name,
          sku,
          category,
          stockIn,
          vendor_name,
          stockUsed: 0,
          stockRemaining: stockIn,
          cost,
          status,
          vendor_id,
          equipment_master_id,
          company_id
        });

        const updatedMasterStock = Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          { stockAvailable: updatedMasterStock },
          { where: { id: equipment_master_id } }
        );

        await db.equipment_history.create({
          name,
          sku,
          category,
          stockIn,
          cost,
          vendor_name,
          stockUsed: 0,
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
        return res.status(200).send({ code: 200, message: "No data found", data: [] });
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
        return res.status(404).json({ message: "Equipment not found." });
      }

      const { projects } = req.body;

      if (!Array.isArray(projects) || projects.length === 0) {
        return res.status(400).json({ message: "projects array is required." });
      }

      for (const p of projects) {
        if (!p.project_id) {
          return res.status(400).json({ message: "project_id is required for every row." });
        }
        if (!Number(p.stock) || Number(p.stock) <= 0) {
          return res.status(400).json({ message: "Assigned stock must be greater than 0." });
        }
      }

      // Every target project must belong to this company.
      const projectIds = [...new Set(projects.map((p) => p.project_id))];
      const companyProjects = await db.project.findAll({ where: { id: projectIds, company_id } });
      const projectById = new Map(companyProjects.map((p) => [String(p.id), p]));
      if (projectIds.some((pid) => !projectById.has(String(pid)))) {
        return res.status(404).json({ message: "Project not found." });
      }

      await db.sequelize.transaction(async (t) => {
        // Re-read under lock so concurrent assignments cannot over-allocate.
        const current = await db.equipment.findOne({
          where: { id, isDeleted: false, company_id },
          transaction: t,
          lock: t.LOCK.UPDATE
        });
        const { name, sku, category, vendor_name, cost, vendor_id, equipment_master_id, quotation_id } = current;
        const stockIn = Number(current.stockIn || 0);
        const stockUsed = Number(current.stockUsed || 0);

        const totalUsedStock = projects.reduce((sum, item) => sum + Number(item.stock), 0);
        const availableStock = stockIn - stockUsed;
        if (totalUsedStock > availableStock) {
          throw Object.assign(
            new Error(`Assigned stock (${totalUsedStock}) exceeds available stock (${availableStock}).`),
            { inventoryCode: 400 }
          );
        }

        const newStockUsed = stockUsed + totalUsedStock;
        await db.equipment.update(
          {
            stockUsed: newStockUsed,
            stockRemaining: stockIn - newStockUsed,
            status: newStockUsed > 0 ? "ASSIGNED" : "NOT ASSIGNED"
          },
          { where: { id, company_id }, transaction: t }
        );

        for (const project of projects) {
          const project_name = projectById.get(String(project.project_id)).name;
          const qty = Number(project.stock);

          let projectStock = await db.equipment_project_stock.findOne({
            where: { equipment_id: id, project_id: project.project_id, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE
          });

          if (projectStock) {
            await projectStock.update(
              { stockUsed: Number(projectStock.stockUsed || 0) + qty, status: "ASSIGNED" },
              { transaction: t }
            );
          } else {
            projectStock = await db.equipment_project_stock.create(
              {
                equipment_id: id,
                project_id: project.project_id,
                name, sku, category, vendor_name, cost,
                stockUsed: qty,
                status: "ASSIGNED",
                vendor_id, equipment_master_id, project_name, quotation_id, company_id
              },
              { transaction: t }
            );
          }

          await db.equipment_history.create(
            {
              name, sku, category,
              stockIn: 0,
              stockUsed: qty,
              cost, vendor_name, project_name,
              equipment_id: current.id,
              equipment_master_id,
              company_id,
              project_id: project.project_id,
              vendor_id, quotation_id,
              user_id: req.user.id,
              status: "ASSIGNED"
            },
            { transaction: t }
          );

          await db.equipment_project_stock_history.create(
            {
              equipment_project_stock_id: projectStock.id,
              equipment_id: id,
              project_id: project.project_id,
              name, sku, category, vendor_name, cost,
              stockUsed: qty,
              status: "ASSIGNED",
              vendor_id, equipment_master_id, project_name, quotation_id, company_id
            },
            { transaction: t }
          );
        }
      });

      const updated = await db.equipment.findOne({
        where: { id, company_id },
        include: [{ model: db.equipment_project_stock, as: "equipment_project_stock" }]
      });

      res.status(200).json({
        message: "Equipment updated successfully.",
        data: updated
      });
    } catch (error) {
      if (error.inventoryCode) {
        return res.status(error.inventoryCode).json({ message: error.message });
      }
      console.error("[UPDATE_EQUIPMENT_ERROR]", error);
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
      const allocated = await db.equipment_project_stock.count({
        where: { equipment_id: id, company_id, stockUsed: { [db.Sequelize.Op.gt]: 0 } }
      });
      if (allocated > 0) {
        return res.status(409).json({
          message: "Cannot delete: stock is still allocated to projects. Transfer or return it first."
        });
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
        return res.status(200).send({ code: 200, message: "No data found", data: [] });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ code: 500, message: error.message || "Server Error" });
    }
  };

  async equipment_stock_transfer(req, res) {
    try {
      const equipment_id = req.params.equipment_id;
      const { note, transfers } = req.body;
      const company_id = req.user.company_id;

      const equipment = await db.equipment.findOne({
        where: { id: equipment_id, isDeleted: false, company_id }
      });

      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found." });
      }

      if (!transfers || !Array.isArray(transfers) || transfers.length === 0) {
        return res.status(400).json({ message: "Transfers data is required" });
      }

      for (const item of transfers) {
        if (!item.from_project_id || !item.to_project_id) {
          return res.status(400).json({ message: "from_project_id and to_project_id are required." });
        }
        if (String(item.from_project_id) === String(item.to_project_id)) {
          return res.status(400).json({ message: "From and To project cannot be the same." });
        }
        if (!Number(item.quantity) || Number(item.quantity) <= 0) {
          return res.status(400).json({ message: "Quantity must be greater than 0." });
        }
      }

      // Every destination project must exist in this company before any stock is touched.
      const toProjectIds = [...new Set(transfers.map((t) => t.to_project_id))];
      const toProjects = await db.project.findAll({ where: { id: toProjectIds, company_id } });
      const projectById = new Map(toProjects.map((p) => [String(p.id), p]));
      if (toProjectIds.some((id) => !projectById.has(String(id)))) {
        return res.status(404).json({ message: "Destination project not found" });
      }

      const { name, sku, category, vendor_name, cost, vendor_id, equipment_master_id, quotation_id } = equipment;

      // All rows move together: a failure part-way through must not leave stock removed but not added.
      await db.sequelize.transaction(async (t) => {
        for (const item of transfers) {
          const { from_project_id, to_project_id, quantity } = item;
          const projectData = projectById.get(String(to_project_id));

          const fromStock = await db.equipment_project_stock.findOne({
            where: { equipment_id, project_id: from_project_id, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE
          });

          if (!fromStock) throw Object.assign(new Error("Source project stock not found"), { transferCode: 404 });
          if (Number(fromStock.stockUsed) < Number(quantity)) {
            throw Object.assign(new Error("Insufficient stock in source project"), { transferCode: 400 });
          }

          const remaining = Number(fromStock.stockUsed) - Number(quantity);
          await fromStock.update(
            { stockUsed: remaining, status: remaining > 0 ? fromStock.status : "NOT ASSIGNED" },
            { transaction: t }
          );

          const [toStock, created] = await db.equipment_project_stock.findOrCreate({
            where: { equipment_id, project_id: to_project_id, company_id },
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
            },
            transaction: t,
            lock: t.LOCK.UPDATE
          });

          if (!created) {
            await toStock.update(
              { stockUsed: Number(toStock.stockUsed) + Number(quantity), status: "ASSIGNED" },
              { transaction: t }
            );
          }

          await db.equipment_history.create(
            {
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
              user_id: req.user.id,
              status: "TRANSFER",
              note
            },
            { transaction: t }
          );
        }

        const allProjectStocks = await db.equipment_project_stock.findAll({
          where: { equipment_id, company_id },
          transaction: t
        });
        const stillAssigned = allProjectStocks.some((ps) => Number(ps.stockUsed) > 0);
        await db.equipment.update(
          { status: stillAssigned ? "ASSIGNED" : "NOT ASSIGNED" },
          { where: { id: equipment_id, company_id }, transaction: t }
        );
      });

      return res.status(200).json({ message: "Equipment stock transferred successfully" });
    } catch (error) {
      if (error.transferCode) {
        return res.status(error.transferCode).json({ message: error.message });
      }
      console.log("[EQUIPMENT_STOCK_TRANSFER_ERROR]", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

}

module.exports = new equipmentController();