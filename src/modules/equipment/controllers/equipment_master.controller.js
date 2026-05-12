const db = require("../../../models");

class equipment_masterController {
    constructor() {
        this.createequipment_Master = this.createequipment_Master.bind(this);
        this.getAllequipment_Masters = this.getAllequipment_Master.bind(this);
        this.getequipment_MasterById = this.getequipment_MasterById.bind(this);
        this.updateequipment_Master = this.updateequipment_Master.bind(this);
        this.deleteequipment_Master = this.deleteequipment_Master.bind(this);
    }

    /**
     * Create equipment_master
     */
async createequipment_Master(req, res) {
    try {
        const {
            name,
            sku,
            category,
            stockAvailable,
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
        const existingequipment = await db.equipment_master.findOne({
            where: { 
                sku: sku,
                company_id: company_id,
                isDeleted: false
            }
        });

        if (existingequipment) {
            return res.status(409).json({
                message: "equipment with this SKU already exists."
            });
        }

        //  Create New equipment
        const equipment_Master = await db.equipment_master.create({
            name,
            sku,
            category,
            stockAvailable,
            status,
            company_id
        });

        res.status(201).json({
            message: "equipment_Master created successfully.",
            data: equipment_Master
        });

    } catch (error) {
        console.error("[CREATE_equipment_master_ERROR]", error);
        res.status(500).json({
            message: "Error creating equipment_master.",
            error: error.message
        });
    }
}

    /**
     * Get All equipment_masters
     */
    async getAllequipment_Master(req, res) {
        try {

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const equipment_masters = await db.equipment_master.findAll({
                where: { isDeleted: false, company_id },
                order: [['createdAt', 'DESC']]
            });


            if (equipment_masters.length > 0) {
                return res
                    .status(200)
                    .send({ code: 200, message: "Success", data: equipment_masters });
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
     * Get equipment_Master By ID
     */
    async getequipment_MasterById(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const equipment_master = await db.equipment_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!equipment_master) {
                return res.status(404).json({ message: "equipment_Master not found." });
            }

            res.status(200).json({ data: equipment_master });

        } catch (error) {
            console.error("[GET_equipment_master_BY_ID_ERROR]", error);
            res.status(500).json({
                message: "Error fetching equipment_master.",
                error: error.message
            });
        }
    }

    /**
     * Update equipment_master
     */
    async updateequipment_Master(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }


            const equipment_master = await db.equipment_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!equipment_master) {
                return res.status(404).json({ message: "equipment_Master not found." });
            }

            const {
                name,
                sku,
                category,
                stockAvailable,
                status,
            } = req.body;

            await equipment_master.update({
                name,
                sku,
                category,
                stockAvailable,
                status
            });

            res.status(200).json({
                message: "equipment_Master updated successfully.",
                data: equipment_master
            });

        } catch (error) {
            console.error("[UPDATE_equipment_master_ERROR]", error);
            res.status(500).json({
                message: "Error updating equipment_master.",
                error: error.message
            });
        }
    }

    /**
     * Delete equipment_Master (Soft Delete)
     */
    async deleteequipment_Master(req, res) {
        try {
            const { id } = req.params;

            const company_id = req.user.company_id;
            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            const equipment_master = await db.equipment_master.findOne({
                where: { id, isDeleted: false, company_id }
            });

            if (!equipment_master) {
                return res.status(404).json({ message: "equipment_Master not found." });
            }

            await equipment_master.update({ isDeleted: true });

            res.status(200).json({
                message: "equipment_Master deleted successfully."
            });

        } catch (error) {
            console.error("[DELETE_equipment_master_ERROR]", error);
            res.status(500).json({
                message: "Error deleting equipment_master.",
                error: error.message
            });
        }
    }
}

module.exports = new equipment_masterController();