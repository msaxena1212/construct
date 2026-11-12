const db = require("../../../models");

class MaterialHistoryController {
    constructor() {
        this.getAllMaterialHistory = this.getAllMaterialHistory.bind(this);
        this.getMaterialHistoryById = this.getMaterialHistoryById.bind(this);
        this.getMaterialHistoryByMaterialId = this.getMaterialHistoryByMaterialId.bind(this);
        this.getMaterialHistoryByMaterialMasterId = this.getMaterialHistoryByMaterialMasterId.bind(this);
    }

    async getAllMaterialHistory(req, res) {
        try {
            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const history = await db.material_history.findAll({
                where: { isDeleted: false, company_id },
                include: [
                    { model: db.material, as: "material", attributes: ["id", "sku", "name", "category"] },
                    { model: db.material_master, as: "material_master", attributes: ["id", "sku", "name", "category"] },
                    { model: db.vendors, as: "vendors", attributes: ["id", "name"] },
                    { model: db.project, as: "project", attributes: ["id", "name"] },
                    { model: db.user, as: "user", attributes: ["id", "firstname", "lastname", "email"] }
                ],
                order: [["createdAt", "DESC"]]
            });

            const formatted = history.map(h => {
                const item = h.toJSON();

                const userFullName = item.user
                    ? `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim()
                    : '';

                return {
                    ...item,
                    category: item.category || item.material?.category || item.material_master?.category,
                    vendor_name: item.vendor_name || item.vendors?.name,
                    project_name: item.project_name || item.project?.name,
                    created_by: userFullName
                };
            });

            return res.status(200).json({ code: 200, message: "Success", data: formatted });

        } catch (error) {
            console.error("[GET_ALL_MATERIAL_HISTORY_ERROR]", error);
            return res.status(500).json({ code: 500, message: error.message || "Server Error" });
        }
    }

    async getMaterialHistoryById(req, res) {
        try {
            const { id } = req.params;
            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const history = await db.material_history.findOne({
                where: { id, isDeleted: false, company_id },
                include: [
                    { model: db.material, as: "material", attributes: ["id", "sku", "name", "category"] },
                    { model: db.material_master, as: "material_master", attributes: ["id", "sku", "name", "category"] },
                    { model: db.vendors, as: "vendors", attributes: ["id", "name"] },
                    { model: db.project, as: "project", attributes: ["id", "name"] },
                    { model: db.user, as: "user", attributes: ["id", "firstname", "lastname", "email"] }
                ]
            });

            if (!history) {
                return res.status(404).json({ message: "Material history not found." });
            }

            const item = history.toJSON();
            const userFullName = item.user
                ? `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim()
                : '';

            return res.status(200).json({
                data: {
                    ...item,
                    category: item.category || item.material?.category || item.material_master?.category,
                    vendor_name: item.vendor_name || item.vendors?.name,
                    project_name: item.project_name || item.project?.name,
                    created_by: userFullName
                }
            });
        } catch (error) {
            console.error("[GET_MATERIAL_HISTORY_BY_ID_ERROR]", error);
            return res.status(500).json({ message: "Error fetching material history.", error: error.message });
        }
    }

    async getMaterialHistoryByMaterialId(req, res) {
        try {
            const { material_id } = req.params;
            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const history = await db.material_history.findAll({
                where: { material_id, isDeleted: false, company_id },
                include: [
                    { model: db.material, as: "material", attributes: ["id", "sku", "name", "category"] },
                    { model: db.material_master, as: "material_master", attributes: ["id", "sku", "name", "category"] },
                    { model: db.vendors, as: "vendors", attributes: ["id", "name"] },
                    { model: db.project, as: "project", attributes: ["id", "name"] },
                    { model: db.user, as: "user", attributes: ["id", "firstname", "lastname", "email"] }
                ],
                order: [["createdAt", "DESC"]]
            });

            if (history.length === 0) {
                return res.status(200).json({ data: [] });
            }

            const formatted = history.map(h => {
                const item = h.toJSON();
                const userFullName = item.user
                    ? `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim()
                    : '';
                return {
                    ...item,
                    category: item.category || item.material?.category || item.material_master?.category,
                    vendor_name: item.vendor_name || item.vendors?.name,
                    project_name: item.project_name || item.project?.name,
                    created_by: userFullName
                };
            });

            return res.status(200).json({ data: formatted });
        } catch (error) {
            console.error("[GET_MATERIAL_HISTORY_BY_MATERIAL_ID_ERROR]", error);
            return res.status(500).json({ message: "Error fetching material history.", error: error.message });
        }
    }

    async getMaterialHistoryByMaterialMasterId(req, res) {
        try {
            const { material_master_id } = req.params;
            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const history = await db.material_history.findAll({
                where: { material_master_id, isDeleted: false, company_id },
                include: [
                    { model: db.material, as: "material", attributes: ["id", "sku", "name", "category"] },
                    { model: db.material_master, as: "material_master", attributes: ["id", "sku", "name", "category"] },
                    { model: db.vendors, as: "vendors", attributes: ["id", "name"] },
                    { model: db.project, as: "project", attributes: ["id", "name"] },
                    { model: db.user, as: "user", attributes: ["id", "firstname", "lastname", "email"] }
                ],
                order: [["createdAt", "DESC"]]
            });

            if (history.length === 0) {
                return res.status(200).json({ data: [] });
            }

            const formatted = history.map(h => {
                const item = h.toJSON();
                const userFullName = item.user
                    ? `${item.user.firstname || ''} ${item.user.lastname || ''}`.trim()
                    : '';
                return {
                    ...item,
                    category: item.category || item.material?.category || item.material_master?.category,
                    vendor_name: item.vendor_name || item.vendors?.name,
                    project_name: item.project_name || item.project?.name,
                    created_by: userFullName
                };
            });

            return res.status(200).json({ data: formatted });
        } catch (error) {
            console.error("[GET_MATERIAL_HISTORY_BY_MASTER_ID_ERROR]", error);
            return res.status(500).json({ message: "Error fetching material history.", error: error.message });
        }
    }
}

module.exports = new MaterialHistoryController();