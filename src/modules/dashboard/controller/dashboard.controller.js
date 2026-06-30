const db = require("../../../models");
const { project, material, equipment } = db;

exports.getDashboardData = async (req, res) => {

  try {
       const company_id = req.user.company_id;
    if (!company_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Company context missing.",
      });
    }
    // Get current month's first day
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    // Total Projects
       const totalProjects = await project.count({
      where: { company_id },
    });

    // Projects added this month
    const projectsThisMonth = await project.count({
      where: {
          company_id,
        createdAt: {
          [db.Sequelize.Op.gte]: startOfMonth,
        },
      },
    });

    // Total Materials
    const totalMaterials = await material.count({
      where: { company_id },
    });

    // Materials added this month
    const materialsThisMonth = await material.count({
      where: {
           company_id,
        createdAt: {
          [db.Sequelize.Op.gte]: startOfMonth,
        },
      },
    });

    // Total Equipment
    const totalEquipment = await equipment.count({
      where: { company_id },
    });

    // Active Equipment
    const activeEquipment = await equipment.count({
      where: {
        isActive: true,
        company_id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        projects: {
          total: totalProjects,
          thisMonth: projectsThisMonth,
        },
        materials: {
          total: totalMaterials,
          newAdded: materialsThisMonth,
        },
        equipment: {
          total: totalEquipment,
          active: activeEquipment,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};