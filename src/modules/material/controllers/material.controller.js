const db = require("../../../models");
class MaterialController {
  constructor() {
    this.createMaterial = this.createMaterial.bind(this);
    this.getAllMaterials = this.getAllMaterials.bind(this);
    this.getMaterialById = this.getMaterialById.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
    this.getMaterialByprojectId = this.getMaterialByprojectId.bind(this);
    this.material_stock_transfer = this.material_stock_transfer.bind(this);
  }

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

      if (!material_master_id) {
        return res.status(400).json({ message: "material_master_id is required." });
      }

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
        where: { isDeleted: false, company_id, material_master_id, vendor_id }
      });

      if (material) {

        const newStockIn = Number(material.stockIn) + Number(stockIn);

        const newStockUsed =
          stockUsed !== undefined && stockUsed !== null
            ? Number(stockUsed)
            : Number(material.stockUsed || 0);

        const computedStatus = newStockUsed > 0 ? "ASSIGNED" : "NOT ASSIGNED";

        await material.update({
          name,
          sku,
          category,
          stockIn: newStockIn,
          vendor_name,
          stockUsed: newStockUsed,
          stockRemaining: newStockIn - newStockUsed,
          cost,
          status: status || computedStatus,
          vendor_id,
          material_master_id
        });

        const existingMaterial = await db.material_master.findOne({
          where: { id: material_master_id }
        });

        if (existingMaterial) {
          const updatedStock =
            Number(existingMaterial.stockAvailable) + Number(stockIn);

          await db.material_master.update(
            { stockAvailable: updatedStock },
            { where: { id: material_master_id } }
          );
        }

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
          stockUsed: newStockUsed,
          vendor_id,
          user_id: req.user.id,
          status: "UPDATED",
        });

        return res.status(201).json({
          message: "Material Updated successfully.",
          data: material
        });

      } else {

        const initialStockIn = Number(stockIn);
        const initialStockUsed = Number(stockUsed || 0);

        const computedStatus = initialStockUsed > 0 ? "ASSIGNED" : "NOT ASSIGNED";

        const newMaterial = await db.material.create({
          name,
          sku,
          category,
          stockIn: initialStockIn,
          vendor_name,
          stockUsed: initialStockUsed,
          stockRemaining: initialStockIn - initialStockUsed,
          cost,
          status: status || computedStatus,
          vendor_id,
          material_master_id,
          company_id
        });

        const existingMaterial = await db.material_master.findOne({
          where: { id: material_master_id }
        });

        if (existingMaterial) {
          const updatedStock =
            Number(existingMaterial.stockAvailable) + Number(stockIn);

          await db.material_master.update(
            { stockAvailable: updatedStock },
            { where: { id: material_master_id } }
          );
        }

        await db.material_history.create({
          name,
          sku,
          category,
          stockIn: initialStockIn,
          cost,
          vendor_name,
          stockUsed: initialStockUsed,
          material_id: newMaterial.id,
          material_master_id,
          company_id,
          vendor_id,
          user_id: req.user.id,
          status: "CREATED",
        });

        return res.status(201).json({
          message: "Material created successfully.",
          data: newMaterial
        });
      }

    } catch (error) {
      console.error("[CREATE_MATERIAL_ERROR]", error);
      return res.status(500).json({
        message: "Error creating material.",
        error: error.message
      });
    }
  }

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
        return res.status(200).send({ code: 200, message: "No data found", data: [] });
      }

    } catch (error) {
      return res.status(500).send({
        code: 500,
        message: error.message || "Server Error"
      });
    }
  }

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
        const current = await db.material.findOne({
          where: { id, isDeleted: false, company_id },
          transaction: t,
          lock: t.LOCK.UPDATE
        });
        const { name, sku, category, vendor_name, cost, vendor_id, material_master_id, quotation_id } = current;
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
        await db.material.update(
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

          let projectStock = await db.material_project_stock.findOne({
            where: { material_id: id, project_id: project.project_id, company_id },
            transaction: t,
            lock: t.LOCK.UPDATE
          });

          if (projectStock) {
            await projectStock.update(
              { stockUsed: Number(projectStock.stockUsed || 0) + qty, status: "ASSIGNED" },
              { transaction: t }
            );
          } else {
            projectStock = await db.material_project_stock.create(
              {
                material_id: id,
                project_id: project.project_id,
                name, sku, category, vendor_name, cost,
                stockUsed: qty,
                status: "ASSIGNED",
                vendor_id, material_master_id, project_name, quotation_id, company_id
              },
              { transaction: t }
            );
          }

          await db.material_history.create(
            {
              name, sku, category,
              stockIn: 0,
              stockUsed: qty,
              cost, vendor_name, project_name,
              material_id: current.id,
              material_master_id,
              company_id,
              project_id: project.project_id,
              vendor_id, quotation_id,
              user_id: req.user.id,
              status: "ASSIGNED"
            },
            { transaction: t }
          );

          await db.material_project_stock_history.create(
            {
              material_project_stock_id: projectStock.id,
              material_id: id,
              project_id: project.project_id,
              name, sku, category, vendor_name, cost,
              stockUsed: qty,
              status: "ASSIGNED",
              vendor_id, material_master_id, project_name, quotation_id, company_id
            },
            { transaction: t }
          );
        }
      });

      const updated = await db.material.findOne({
        where: { id, company_id },
        include: [{ model: db.material_project_stock, as: "material_project_stock" }]
      });

      res.status(200).json({
        message: "Material updated successfully.",
        data: updated
      });
    } catch (error) {
      if (error.inventoryCode) {
        return res.status(error.inventoryCode).json({ message: error.message });
      }
      console.error("[UPDATE_MATERIAL_ERROR]", error);
      res.status(500).json({
        message: "Error updating material.",
        error: error.message
      });
    }
  }

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
      const allocated = await db.material_project_stock.count({
        where: { material_id: id, company_id, stockUsed: { [db.Sequelize.Op.gt]: 0 } }
      });
      if (allocated > 0) {
        return res.status(409).json({
          message: "Cannot delete: stock is still allocated to projects. Transfer or return it first."
        });
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

  async material_stock_transfer(req, res) {
    // TEMPORARY SAFETY GATE — Project Reallocation containment (see ERP_MASTER_COMPLETION_REGISTER.md).
    // This legacy path moves stock by changing project counters without paired ledger movements. It is refused
    // before any database access until it is replaced by the ledger-based reallocation. The original body below
    // is intentionally preserved for that replacement and is not reachable while the gate is in place.
    return res.status(409).json({
      status: "failed",
      code: "REALLOCATION_UNAVAILABLE",
      message: "Project Reallocation is temporarily unavailable pending ledger reconciliation.",
    });
    // eslint-disable-next-line no-unreachable
    try {
      const material_id = req.params.material_id;
      const { note, transfers } = req.body;
      const company_id = req.user.company_id;

      const material = await db.material.findOne({
        where: { id: material_id, isDeleted: false, company_id }
      });

      if (!material) {
        return res.status(404).json({ message: "Material not found." });
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

      const { name, sku, category, vendor_name, cost, vendor_id, material_master_id, quotation_id } = material;

      // All rows move together: a failure part-way through must not leave stock removed but not added.
      await db.sequelize.transaction(async (t) => {
        for (const item of transfers) {
          const { from_project_id, to_project_id, quantity } = item;
          const projectData = projectById.get(String(to_project_id));

          const fromStock = await db.material_project_stock.findOne({
            where: { material_id, project_id: from_project_id, company_id },
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

          const [toStock, created] = await db.material_project_stock.findOrCreate({
            where: { material_id, project_id: to_project_id, company_id },
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

          await db.material_history.create(
            {
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
              project_name: projectData.name,
              user_id: req.user.id,
              status: "TRANSFER",
              note
            },
            { transaction: t }
          );
        }

        const allProjectStocks = await db.material_project_stock.findAll({
          where: { material_id, company_id },
          transaction: t
        });
        const stillAssigned = allProjectStocks.some((ps) => Number(ps.stockUsed) > 0);
        await db.material.update(
          { status: stillAssigned ? "ASSIGNED" : "NOT ASSIGNED" },
          { where: { id: material_id, company_id }, transaction: t }
        );
      });

      return res.status(200).json({ message: "Stock transferred successfully" });
    } catch (error) {
      if (error.transferCode) {
        return res.status(error.transferCode).json({ message: error.message });
      }
      console.log("[MATERIAL_STOCK_TRANSFER_ERROR]", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

}

module.exports = new MaterialController();