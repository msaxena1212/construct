const db = require("../../../models");
const { project, material, equipment } = db;

exports.getDashboardData = async (req, res) => {
  try {
    // Get current month's first day
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    // Total Projects
    const totalProjects = await project.count();

    // Projects added this month
    const projectsThisMonth = await project.count({
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: startOfMonth,
        },
      },
    });

    // Total Materials
    const totalMaterials = await material.count();

    // Materials added this month
    const materialsThisMonth = await material.count({
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: startOfMonth,
        },
      },
    });

    // Total Equipment
    const totalEquipment = await equipment.count();

    // Active Equipment
    const activeEquipment = await equipment.count({
      where: {
        isActive: true,
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