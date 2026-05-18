const db = require("../../../models");

module.exports = {
  async createStockRequest(req, res) {
    try {
      const { material_id, task_title, requested_qty, available_qty, project_id } = req.body;

      const stockRequest = await db.StockRequest.create({
        material_id,
        task_title,
        requested_qty,
        available_qty,
        project_id,
      });

      return res.status(201).json({
        message: "Stock request created successfully.",
        data: stockRequest,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Error creating stock request.",
        error,
      });
    }
  },

  async getAllStockRequests(req, res) {
    try {
      const stockRequests = await db.StockRequest.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        message: "Fetched all stock requests successfully.",
        data: stockRequests,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching stock requests.",
        error,
      });
    }
  },

  async getStockRequestById(req, res) {
    try {
      const { id } = req.params;

      const stockRequest = await db.StockRequest.findByPk(id);

      if (!stockRequest) {
        return res.status(404).json({
          message: "Stock request not found.",
        });
      }

      return res.status(200).json({
        message: "Stock request fetched successfully.",
        data: stockRequest,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching stock request.",
        error,
      });
    }
  },

  async updateStockRequest(req, res) {
    try {
      const { id } = req.params;

      const stockRequest = await db.StockRequest.findByPk(id);

      if (!stockRequest) {
        return res.status(404).json({
          message: "Stock request not found.",
        });
      }

      await stockRequest.update(req.body);

      return res.status(200).json({
        message: "Stock request updated successfully.",
        data: stockRequest,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating stock request.",
        error,
      });
    }
  },

  async deleteStockRequest(req, res) {
    try {
      const { id } = req.params;

      const stockRequest = await db.StockRequest.findByPk(id);

      if (!stockRequest) {
        return res.status(404).json({
          message: "Stock request not found.",
        });
      }

      await stockRequest.destroy();

      return res.status(200).json({
        message: "Stock request deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting stock request.",
        error,
      });
    }
  },

  async approveStockRequest(req, res) {
  try {
    const { id } = req.params;
    const stockRequest =
    await db.StockRequest.findByPk(id);
    if (!stockRequest) {
      return res.status(404).json({
        message: "Stock request not found.",
      });
    }
    await stockRequest.update({
      status: "approved",
      approved_qty:
        stockRequest.requested_qty,
    });

    return res.status(200).json({
      message: "Stock request approved successfully.",
      data: stockRequest,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Error approving stock request.",
      error,
    });

  }

},

async rejectStockRequest(req, res) {
  try {
    const { id } = req.params;
    const stockRequest =
      await db.StockRequest.findByPk(id);
    if (!stockRequest) {
      return res.status(404).json({
        message: "Stock request not found.",
      });
    }
    await stockRequest.update({
      status: "rejected",
    });
    return res.status(200).json({
      message: "Stock request rejected successfully.",
      data: stockRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error rejecting stock request.",
      error,
    });
  }
}
};