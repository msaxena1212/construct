const db = require("../../../models");

class equipmentController {
  constructor() {
    this.createequipment = this.createequipment.bind(this);
    this.getAllequipments = this.getAllequipments.bind(this);
    this.getequipmentById = this.getequipmentById.bind(this);
    this.updateequipment = this.updateequipment.bind(this);
    this.deleteequipment = this.deleteequipment.bind(this);
    this.getequipmentByprojectId = this.getequipmentByprojectId .bind(this);
    this.getAllequipments_history = this.getAllequipments_history.bind(this);
  }

  /**
   * Create equipment
   */
  async createequipment(req, res) {
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
        equipment_master_id
      } = req.body;

      const company_id = req.user.company_id;

      // if (!equipment_master_id) {
      //   return res.status(400).json({ message: "equipment are required." });
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


      const equipment = await db.equipment.findOne({
        where: { isDeleted: false, company_id, project_id, equipment_master_id }
      });

      if (equipment) {
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
          equipment_master_id,
        } = req.body;

        await equipment.update({
          name,
          sku,
          category,
          stockIn: Number(equipment.stockIn) + Number(stockIn),
          vendor_name,
          project_name,
          project_id,
          cost,
          status,
          vendor_id,
          equipment_master_id
        });

        const existingequipment = await db.equipment_master.findOne({
          where: {
            id: equipment_master_id
          }
        });

        const updatedStock =
          Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          {
            stockAvailable: updatedStock
          },
          {
            where: {
              id: equipment_master_id
            }
          }
        );


        // ================= CREATE HISTORY =================
        await db.equipment_history.create({
          name,
          sku,
          category,
          stockIn,
          cost,
          vendor_name,
          project_name,
          equipment_id: equipment.id,
          equipment_master_id,
          company_id,
          project_id,
          vendor_id,
          status: "UPDATED",

        });

        res.status(201).json({
          message: "equipment Updated successfully.",
          data: equipment
        });



      }

      else {

        const equipment = await db.equipment.create({
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
          equipment_master_id,
          company_id
        });

        const existingequipment = await db.equipment_master.findOne({
          where: {
            id: equipment_master_id
          }
        });

        const updatedStock =
          Number(existingequipment.stockAvailable) + Number(stockIn);

        await db.equipment_master.update(
          {
            stockAvailable: updatedStock
          },
          {
            where: {
              id: equipment_master_id
            }
          }
        );

        // ================= CREATE HISTORY =================

        await db.equipment_history.create({
          name,
          sku,
          category,
          stockIn,
          cost,
          vendor_name,
          project_name,
          equipment_id: equipment.id,
          equipment_master_id,
          company_id,
          project_id,
          vendor_id,
          status: "CREATED",

        });

        res.status(201).json({
          message: "equipment created successfully.",
          data: equipment
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


  /**
   * Get All equipments
   */
  async getAllequipments(req, res) {
    try {

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const equipments = await db.equipment.findAll({
        where: { isDeleted: false, company_id },
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

  /**
   * Get equipment By ID
   */
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

  /**
   * Update equipment
   */
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
        stockIn,
        vendor_name,
        project_name,
        project_id,
        cost,
        status,
        vendor_id,
        equipment_master_id,
      } = req.body;

      await equipment.update({
        name,
        sku,
        category,
        // stockIn: Number(equipment.stockIn) + Number(stockIn),
        vendor_name,
        project_name,
        project_id,
        cost,
        status,
        vendor_id,
        equipment_master_id
      });

      // const existingequipment = await db.equipment_master.findOne({
      //   where: {
      //     id: equipment_master_id
      //   }
      // });

      // const updatedStock =
      //   Number(existingequipment.stockAvailable) + Number(stockIn);

      // await db.equipment_master.update(
      //   {
      //     stockAvailable: updatedStock
      //   },
      //   {
      //     where: {
      //       id: equipment_master_id
      //     }
      //   }
      // );

      // ================= CREATE HISTORY =================
      await db.equipment_history.create({
        name,
        sku,
        category,
        stockIn,
        cost,
        vendor_name,
        project_name,
        equipment_id: equipment.id,
        equipment_master_id,
        company_id,
        project_id,
        vendor_id,
        status: "UPDATED",

      });


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

  /**
   * Delete equipment (Soft Delete)
   */
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


    /**
   * Get All equipments history
   */
  async getAllequipments_history(req, res) {
    try {

      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const equipments = await db.equipment_history.findAll({
        where: { isDeleted: false, company_id },
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



}

module.exports = new equipmentController();