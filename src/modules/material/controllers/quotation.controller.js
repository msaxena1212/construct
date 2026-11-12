const db = require("../../../models");

class QuotationController {
    constructor() {
        this.create_quotation = this.create_quotation.bind(this);
        this.getall_quotation = this.getall_quotation.bind(this);
        this.getbyid_quotation = this.getbyid_quotation.bind(this);
        this.update_quotation = this.update_quotation.bind(this);
        this.delete_quotation = this.delete_quotation.bind(this);
        this.get_quotation_by_material_master_id =
            this.get_quotation_by_material_master_id.bind(this);
        this.get_quotation_by_equipment_master_id =
            this.get_quotation_by_equipment_master_id.bind(this);
    }

    async create_quotation(req, res) {
        try {
            const {
                date,
                sales_person,
                items,
                status,
                vendor_feedback,
                quotation_status,
                quotation_type
            } = req.body;

            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            if (!date) {
                return res.status(400).json({
                    message: "date is required."
                });
            }

            if (!quotation_status) {
                return res.status(400).json({
                    message: "quotation_status is required."
                });
            }

            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    message: "items must be a non-empty array."
                });
            }

            let total_amount = 0;

            for (const item of items) {

                if (
                    !item.sku ||
                    !item.name ||
                    !item.category ||
                    !item.quantity ||
                    !item.unitPrice ||
                    !item.totalPrice ||
                    !item.vendor_id ||
                    !item.vendor_name
                ) {
                    return res.status(400).json({
                        message:
                            "Each item must contain sku, name, category, stockAvailable, unitPrice , totalPrice, and vendor_name."
                    });
                }

                item.totalPrice =
                    Number(item.quantity) * Number(item.unitPrice);

                total_amount += Number(item.totalPrice);

            }

            const quotation = await db.quotation.create({
                date,
                sales_person,
                items,
                total_amount,
                status: status || "Draft",
                vendor_feedback,
                quotation_status,
                quotation_type,
                company_id,
                last_updated: new Date(),
                quotation_number: "QT-"
            });

            const quotation_number = `QT-${quotation.id}`;

            await quotation.update({
                quotation_number
            });

            return res.status(201).json({
                message: "Quotation created successfully.",
                data: {
                    ...quotation.toJSON(),
                    quotation_number
                }
            });

        } catch (error) {

            console.error("[CREATE_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error creating quotation.",
                error: error.message
            });
        }
    }

    async update_approval_quotation_status(req, res) {
        try {

            const { id } = req.params;

            const { status } = req.body;

            const company_id = req.user.company_id;

            if (!company_id) {
                return res.status(401).json({ message: "Unauthorized. Company context missing." });
            }

            if (!status) {
                return res.status(400).json({
                    message: "status is required."
                });
            }

            const quotation = await db.quotation.findOne({
                where: {
                    id: id,
                    isDeleted: false
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Quotation not found."
                });
            }

            if (
                quotation.status === "Approved" &&
                status === "Rejected"
            ) {
                return res.status(400).json({
                    message: "Quotation already approved."
                });
            }

            if (
                quotation.status === "Approved" &&
                status === "Approved"
            ) {
                return res.status(400).json({
                    message: "Quotation already approved."
                });
            }

            if (
                quotation.status === "Rejected" &&
                status === "Rejected"
            ) {
                return res.status(400).json({
                    message: "Quotation already Rejected."
                });
            }

            if (status === "Approved") {

                let items = quotation.items || quotation.dataValues.items || [];

                if (typeof items === "string") {
                    items = JSON.parse(items);
                }

                console.log(items);


                for (const item of items) {

                    const quantity = Number(item.quantity) || 0;

                    if (item.material_master_id) {

                        const existingMaterial =
                            await db.material_master.findOne({
                                where: {
                                    id: item.material_master_id
                                }
                            });

                        if (existingMaterial) {

                            const updatedStock =
                                Number(existingMaterial.stockAvailable || 0) +
                                quantity;

                            await db.material_master.update(
                                {
                                    stockAvailable: updatedStock
                                },
                                {
                                    where: {
                                        id: item.material_master_id
                                    }
                                }
                            );

                            const newMaterial = await db.material.create({
                                name: item.name,
                                sku: item.sku,
                                category: item.category,
                                stockIn: quantity,
                                stockRemaining: quantity,
                                vendor_name: item.vendor_name,
                                cost: item.unitPrice,
                                status: "NOT ASSIGNED",
                                vendor_id: item.vendor_id,
                                material_master_id: item.material_master_id,
                                company_id,
                                quotation_id: id
                            });

                            await db.material_history.create({
                                name: item.name,
                                sku: item.sku,
                                category: item.category,
                                stockIn: quantity,
                                stockUsed: 0,
                                cost: item.unitPrice,
                                vendor_name: item.vendor_name,
                                material_id: newMaterial.id,
                                material_master_id: item.material_master_id,
                                company_id,
                                vendor_id: item.vendor_id,
                                quotation_id: id,
                                status: "CREATED",
                                user_id: req.user.id,
                            });
                        }
                    }

                    if (item.equipment_master_id) {

                        const existingEquipment =
                            await db.equipment_master.findOne({
                                where: {
                                    id: item.equipment_master_id
                                }
                            });

                        if (existingEquipment) {

                            const updatedStock =
                                Number(existingEquipment.stockAvailable || 0) +
                                quantity;

                            await db.equipment_master.update(
                                {
                                    stockAvailable: updatedStock
                                },
                                {
                                    where: {
                                        id: item.equipment_master_id
                                    }
                                }
                            );

                            const newEquipment = await db.equipment.create({
                                name: item.name,
                                sku: item.sku,
                                category: item.category,
                                stockIn: quantity,
                                stockRemaining: quantity,
                                vendor_name: item.vendor_name,
                                cost: item.unitPrice,
                                status: "NOT ASSIGNED",
                                vendor_id: item.vendor_id,
                                equipment_master_id: item.equipment_master_id,
                                company_id,
                                quotation_id: id
                            });

                            await db.equipment_history.create({
                                name: item.name,
                                sku: item.sku,
                                category: item.category,
                                stockIn: quantity,
                                stockUsed: 0,
                                cost: item.unitPrice,
                                vendor_name: item.vendor_name,
                                equipment_id: newEquipment.id,
                                equipment_master_id: item.equipment_master_id,
                                company_id,
                                vendor_id: item.vendor_id,
                                quotation_id: id,
                                status: "CREATED",
                                user_id: req.user.id,
                            });
                        }
                    }
                }
            }

            await quotation.update({
                status
            });

            return res.status(200).json({
                message: `Quotation ${status} successfully.`,
                data: quotation
            });

        } catch (error) {

            console.error("[UPDATE_QUOTATION_STATUS_ERROR]", error);

            return res.status(500).json({
                message: "Error updating quotation status.",
                error: error.message
            });
        }
    }

    async create_multiple_quotation(req, res) {
        try {

            const quotations = req.body;

            const company_id = req.user.company_id;

            if (!Array.isArray(quotations) || quotations.length === 0) {
                return res.status(400).json({
                    message: "Quotation array is required."
                });
            }

            const createdQuotations = [];
            const duplicateSkus = [];

            const lastQuotation = await db.quotation.findOne({
                order: [["id", "DESC"]]
            });

            let nextQuotationNumber = lastQuotation
                ? lastQuotation.id + 1
                : 1;

            for (const item of quotations) {

                const {
                    name,
                    sku,
                    category,
                    quantity,
                    unit_cost,
                    total_cost,
                    vendor_name,
                    status,
                    material_master_id,
                    equipment_master_id,
                    vendor_id,
                    quotation_status
                } = item;

                if (!name || !sku) {
                    return res.status(400).json({
                        message: "name and sku are required."
                    });
                }

                const existingQuotation = await db.quotation.findOne({
                    where: {
                        sku,
                        company_id,
                        isDeleted: false
                    }
                });

                if (existingQuotation) {
                    duplicateSkus.push(sku);
                    continue;
                }

                const quotation_number = `QT-${nextQuotationNumber++}`;

                const quotation = await db.quotation.create({
                    name,
                    sku,
                    category,
                    quantity,
                    unit_cost,
                    total_cost,
                    vendor_name,
                    status,
                    material_master_id,
                    equipment_master_id,
                    vendor_id,
                    company_id,
                    quotation_status,
                    quotation_number
                });

                createdQuotations.push(quotation);
            }

            return res.status(201).json({
                message: "Multiple quotations processed successfully.",
                total_created: createdQuotations.length,
                duplicate_skus: duplicateSkus,
                data: createdQuotations
            });

        } catch (error) {

            console.error("[CREATE_MULTIPLE_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error creating multiple quotations.",
                error: error.message
            });
        }
    }

    async getall_quotation(req, res) {
        try {

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    isDeleted: false,
                    company_id
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length > 0) {

                const formattedData = quotations.map((quotation) => {

                    let items = quotation.items;

                    if (typeof items === "string") {
                        items = JSON.parse(items);
                    }

                    return {
                        ...quotation.toJSON(),
                        items
                    };
                });

                return res.status(200).json({
                    code: 200,
                    message: "Success",
                    data: formattedData
                });

            } else {

                return res.status(200).json({
                    code: 200,
                    message: "No data found",
                    data: []
                });
            }

        } catch (error) {

            console.error("[GETALL_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching quotations.",
                error: error.message
            });
        }
    }

    async getbyid_quotation(req, res) {
        try {

            const { id } = req.params;

            const company_id = req.user.company_id;

            const quotation = await db.quotation.findOne({
                where: {
                    id,
                    company_id,
                    isDeleted: false
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Quotation not found."
                });
            }

            return res.status(200).json({
                data: quotation
            });

        } catch (error) {
            console.error("[GET_QUOTATION_BY_ID_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching quotation.",
                error: error.message
            });
        }
    }

    async update_quotation(req, res) {
        try {

            const { id } = req.params;

            const company_id = req.user.company_id;

            const quotation = await db.quotation.findOne({
                where: {
                    id,
                    company_id,
                    isDeleted: false
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Quotation not found."
                });
            }

            const {
                date,
                sales_person,
                items,
                status,
                vendor_feedback,
                quotation_status
            } = req.body;

            if (!date) {
                return res.status(400).json({
                    message: "date is required."
                });
            }

            if (!quotation_status) {
                return res.status(400).json({
                    message: "quotation_status is required."
                });
            }

            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    message: "items must be a non-empty array."
                });
            }

            let total_amount = 0;

            for (const item of items) {

                if (
                    !item.sku ||
                    !item.name ||
                    !item.category ||
                    !item.quantity ||
                    !item.unitPrice ||
                    !item.vendor_id ||
                    !item.vendor_name
                ) {
                    return res.status(400).json({
                        message:
                            "Each item must contain sku, name, category, quantity, unitPrice, vendor_id and vendor_name."
                    });
                }

                item.totalPrice =
                    Number(item.quantity) * Number(item.unitPrice);

                total_amount += Number(item.totalPrice);

                if (item.material_master_id) {

                    const existingMaterial = await db.material_master.findOne({
                        where: {
                            id: item.material_master_id
                        }
                    });

                    if (existingMaterial) {

                        const updatedStock =
                            Number(existingMaterial.stockAvailable) +
                            Number(item.quantity);

                        await db.material_master.update(
                            {
                                stockAvailable: updatedStock
                            },
                            {
                                where: {
                                    id: item.material_master_id
                                }
                            }
                        );
                    }
                }
            }

            await quotation.update({
                date,
                sales_person,
                items,
                total_amount,
                status: status || quotation.status,
                vendor_feedback,
                quotation_status,
                last_updated: new Date()
            });

            return res.status(200).json({
                message: "Quotation updated successfully.",
                data: quotation
            });

        } catch (error) {

            console.error("[UPDATE_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error updating quotation.",
                error: error.message
            });
        }
    }

    async delete_quotation(req, res) {
        try {

            const { id } = req.params;

            const company_id = req.user.company_id;

            const quotation = await db.quotation.findOne({
                where: {
                    id,
                    company_id,
                    isDeleted: false
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Quotation not found."
                });
            }

            await quotation.update({
                isDeleted: true
            });

            return res.status(200).json({
                message: "Quotation deleted successfully."
            });

        } catch (error) {
            console.error("[DELETE_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error deleting quotation.",
                error: error.message
            });
        }
    }

    async get_quotation_by_material_master_id(req, res) {
        try {

            const { material_master_id } = req.params;

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    material_master_id,
                    company_id,
                    isDeleted: false
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length === 0) {
                return res.status(404).json({
                    message: "No quotation found."
                });
            }

            return res.status(200).json({
                data: quotations
            });

        } catch (error) {
            console.error("[GET_QUOTATION_BY_MATERIAL_ID_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching quotation.",
                error: error.message
            });
        }
    }

    async get_quotation_by_equipment_master_id(req, res) {
        try {

            const { equipment_master_id } = req.params;

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    equipment_master_id,
                    company_id,
                    isDeleted: false
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length === 0) {
                return res.status(404).json({
                    message: "No quotation found."
                });
            }

            return res.status(200).json({
                data: quotations
            });

        } catch (error) {
            console.error("[GET_QUOTATION_BY_EQUIPMENT_ID_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching quotation.",
                error: error.message
            });
        }
    }

    async getall_material_quotation(req, res) {
        try {

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    isDeleted: false,
                    company_id
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length === 0) {
                return res.status(404).json({
                    message: "No quotations found."
                });
            }

            const materialQuotations = quotations
                .map((quotation) => {

                    let items = quotation.items;

                    if (typeof items === "string") {
                        items = JSON.parse(items);
                    }

                    const materialItems = Array.isArray(items)
                        ? items.filter(
                            (item) => item.status === "MATERIAL"
                        )
                        : [];

                    return {
                        ...quotation.toJSON(),
                        items: materialItems
                    };
                })
                .filter((quotation) => quotation.items.length > 0);

            if (materialQuotations.length === 0) {
                return res.status(404).json({
                    message: "No material quotations found."
                });
            }

            return res.status(200).json({
                message: "Material quotations fetched successfully.",
                data: materialQuotations
            });

        } catch (error) {

            console.error("[GETALL_MATERIAL_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching material quotations.",
                error: error.message
            });
        }
    }

    async get_material_quotation_by_id(req, res) {
        try {

            const { id } = req.params;

            const company_id = req.user.company_id;

            const quotation = await db.quotation.findOne({
                where: {
                    id,
                    status: "MATERIAL",
                    isDeleted: false,
                    company_id
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Material quotation not found."
                });
            }

            return res.status(200).json({
                message: "Material quotation fetched successfully.",
                data: quotation
            });

        } catch (error) {

            console.error("[GET_MATERIAL_QUOTATION_BY_ID_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching material quotation.",
                error: error.message
            });
        }
    }

    async getall_equipment_quotation(req, res) {
        try {

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    status: "EQUIPMENT",
                    isDeleted: false,
                    company_id
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length === 0) {
                return res.status(404).json({
                    message: "No equipment quotations found."
                });
            }

            return res.status(200).json({
                message: "Equipment quotations fetched successfully.",
                data: quotations
            });

        } catch (error) {

            console.error("[GETALL_EQUIPMENT_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching equipment quotations.",
                error: error.message
            });
        }
    }

    async get_equipment_quotation_by_id(req, res) {
        try {

            const { id } = req.params;

            const company_id = req.user.company_id;

            const quotation = await db.quotation.findOne({
                where: {
                    id,
                    status: "EQUIPMENT",
                    isDeleted: false,
                    company_id
                }
            });

            if (!quotation) {
                return res.status(404).json({
                    message: "Equipment quotation not found."
                });
            }

            return res.status(200).json({
                message: "Equipment quotation fetched successfully.",
                data: quotation
            });

        } catch (error) {

            console.error("[GET_EQUIPMENT_QUOTATION_BY_ID_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching equipment quotation.",
                error: error.message
            });
        }
    }

    async getall_material_quotation_company(req, res) {
        try {

            const company_id = req.user.company_id;

            const quotations = await db.quotation.findAll({
                where: {
                    isDeleted: false,
                    company_id
                },
                order: [["createdAt", "DESC"]]
            });

            if (quotations.length === 0) {
                return res.status(404).json({
                    message: "No quotations found."
                });
            }

            const materialQuotations = quotations
                .map((quotation) => {

                    let items = quotation.items;

                    if (typeof items === "string") {
                        items = JSON.parse(items);
                    }

                    const materialItems = Array.isArray(items)
                        ? items.filter(
                            (item) => item.status === "MATERIAL"
                        )
                        : [];

                    return {
                        ...quotation.toJSON(),
                        items: materialItems
                    };
                })
                .filter((quotation) => quotation.items.length > 0);

            if (materialQuotations.length === 0) {
                return res.status(404).json({
                    message: "No material quotations found."
                });
            }

            return res.status(200).json({
                message: "Material quotations fetched successfully.",
                data: materialQuotations
            });

        } catch (error) {

            console.error("[GETALL_MATERIAL_QUOTATION_ERROR]", error);

            return res.status(500).json({
                message: "Error fetching material quotations.",
                error: error.message
            });
        }
    }

}


module.exports = new QuotationController();