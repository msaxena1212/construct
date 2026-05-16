const db = require("../../../models");

class Material_masterController {
    constructor() {
        this.createMaterial_Master = this.createMaterial_Master.bind(this);
        this.getAllMaterial_Masters = this.getAllMaterial_Master.bind(this);
        this.getMaterial_MasterById = this.getMaterial_MasterById.bind(this);
        this.updateMaterial_Master = this.updateMaterial_Master.bind(this);
        this.deleteMaterial_Master = this.deleteMaterial_Master.bind(this);
    }

    /**
     * Create Material_master
     */
async createMaterial_Master(req, res) {
    try {
        const {
            name,
            sku,
            category,
            stockAvailable,
            cost,
            status,
        } = req.body;

        const company_id = req.user.company_id;

        //  Validation
        if (!sku || !company_id) {
            return res.status(400).json({ message: "sku and company_id are required." });
        }

        if (!name) {
            return res.status(400).json({ message: "name is required." });
        }

        if (!category) {
            return res.status(400).json({ message: "category is required." });
        }

        //  Duplicate SKU Check
        const existingMaterial = await db.material_master.findOne({
            where: { 
                sku: sku,
                company_id: company_id,
                isDeleted: false
            }
        });

        if (existingMaterial) {
            return res.status(409).json({
                message: "Material with this SKU already exists."
            });
        }

        //  Create New Material
        const Material_Master = await db.material_master.create({
            name,
            sku,
            category,
            stockAvailable,
            cost,
            status,
            company_id
        });

        res.status(201).json({
            message: "Material_Master created successfully.",
            data: Material_Master
        });

    } catch (error) {
        console.error("[CREATE_Material_master_ERROR]", error);
        res.status(500).json({
            message: "Error creating material_master.",
            error: error.message
        });
    }
}

    /**
     * Get All Material_masters
     */
    async getAllMaterial_Master(req, res) {
        try {

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const material_masters = await db.material_master.findAll({
                where: { isDeleted: false, company_id },
                order: [['createdAt', 'DESC']]
            });


            if (material_masters.length > 0) {
                return res
                    .status(200)
                    .send({ code: 200, message: "Success", data: material_masters });
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
     * Get Material_Master By ID
     */
    async getMaterial_MasterById(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const material_master = await db.material_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!material_master) {
                return res.status(404).json({ message: "Material_Master not found." });
            }

            res.status(200).json({ data: material_master });

        } catch (error) {
            console.error("[GET_Material_master_BY_ID_ERROR]", error);
            res.status(500).json({
                message: "Error fetching material_master.",
                error: error.message
            });
        }
    }

    /**
     * Update Material_master
     */
    async updateMaterial_Master(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }


            const material_master = await db.material_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!material_master) {
                return res.status(404).json({ message: "Material_Master not found." });
            }

            const {
                name,
                sku,
                category,
                stockAvailable,
                cost,
                status,
            } = req.body;

            await material_master.update({
                name,
                sku,
                category,
                stockAvailable,
                cost,
                status
            });

            res.status(200).json({
                message: "Material_Master updated successfully.",
                data: material_master
            });

        } catch (error) {
            console.error("[UPDATE_Material_master_ERROR]", error);
            res.status(500).json({
                message: "Error updating material_master.",
                error: error.message
            });
        }
    }

    /**
     * Delete Material_Master (Soft Delete)
     */
    async deleteMaterial_Master(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const material_master = await db.material_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!material_master) {
                return res.status(404).json({ message: "Material_Master not found." });
            }

            await material_master.update({ isDeleted: true });

            res.status(200).json({
                message: "Material_Master deleted successfully."
            });

        } catch (error) {
            console.error("[DELETE_Material_master_ERROR]", error);
            res.status(500).json({
                message: "Error deleting material_master.",
                error: error.message
            });
        }
    }
}

module.exports = new Material_masterController();