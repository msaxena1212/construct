const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  constructor() {
    this.getAllUsers = this.getAllUsers.bind(this);
    this.registerCompany = this.registerCompany.bind(this);
    this.getAllCompanies = this.getAllCompanies.bind(this);
    this.toggleCompanyStatus = this.toggleCompanyStatus.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.getInviteInfo = this.getInviteInfo.bind(this);
    this.getTeamUsers = this.getTeamUsers.bind(this);
    this.toggleUserStatus = this.toggleUserStatus.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getUserHistory = this.getUserHistory.bind(this);
  }


  async logHistory({ user_id, performed_by, company_id, action, description }, transaction = null) {
    try {
      await db.employee_history.create(
        { user_id, performed_by: performed_by || null, company_id, action, description },
        transaction ? { transaction } : {}
      );
    } catch (err) {
      console.error("[LOG_HISTORY_ERROR]", err);
    }
  }

  async registerCompany(req, res) {
    try {
      let { firstname, lastname, email, mobile, password, name } = req.body;

      if (!firstname || !lastname || !email || !mobile || !password || !name) {
        return res.status(400).json({ message: "All fields are required." });
      }
      email = email.toLowerCase().trim();
      name = name.trim();

      const existingCompany = await db.company.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ email }, { name }],
        },
      });

      if (existingCompany) {
        return res
          .status(400)
          .json({ message: "Company with the same email already exists." });
      }
      const company = await db.company.create({ name, email });

      if (!company) {
        throw new Error("Error creating company.");
      }
      const company_id = company.id;
      const role = await db.role.findOne({ where: { name: "COMPANY_ADMIN" } });

      if (!role) {
        throw new Error("Admin role not found.");
      }

      const user = await db.user.create({
        firstname,
        lastname,
        email,
        mobile,
        password: bcrypt.hashSync(password, 8),
        company_id,
        role_id: role.id,
        isActive: true,
        isInviteAccepted: true,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      res
        .status(201)
        .json({ message: "User created successfully.", data: user, accessToken: token });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Error creating user.", error });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await db.user.findAll({
        attributes: { exclude: ["password"] },
      });
      res.json({ message: "Fetched all users successfully.", data: users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users.", error });
    }
  }

  async getAllCompanies(req, res) {
    try {

      if (req.user && req.user.company_id) {
        return res.status(403).json({ message: "Unauthorized. Super Admin access only." });
      }

      const companies = await db.company.findAll({
        where: { isDeleted: false },
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json({ data: companies });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching companies.", error });
    }
  }

  async toggleCompanyStatus(req, res) {
    try {
      if (req.user && req.user.company_id) {
        return res.status(403).json({ message: "Unauthorized. Super Admin access only." });
      }

      const { id } = req.params;
      const { isActive } = req.body;

      const company = await db.company.findByPk(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      await company.update({ isActive });

      res.status(200).json({ message: `Company account ${isActive ? 'enabled' : 'disabled'} successfully.` });
    } catch (error) {
      res.status(500).json({ message: "Error updating company status.", error });
    }
  }

  async inviteUser(req, res) {
    let t;
    try {
      const { firstname, lastname, email, role_id } = req.body;
      const company_id = req.user.company_id;

      if (!firstname || !lastname || !email || !role_id || !company_id) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = await db.user.findOne({ where: { email: email.toLowerCase().trim() } });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists." });
      }

      t = await db.sequelize.transaction();

      const inviteToken = require("crypto").randomBytes(32).toString("hex");

      const user = await db.user.create({
        firstname,
        lastname,
        email: email.toLowerCase().trim(),
        role_id,
        company_id,
        inviteToken,
        isInviteAccepted: false
      }, { transaction: t });


      const [company, role] = await Promise.all([
        db.company.findByPk(company_id, { transaction: t }),
        db.role.findByPk(role_id, { transaction: t })
      ]);
      const companyName = company ? company.name : "Your Team";

      await this.logHistory({
        user_id: user.id,
        performed_by: req.user.id,
        company_id,
        action: "INVITED",
        description: `${firstname} ${lastname} was invited to join ${companyName} as "${role ? role.name : 'Unassigned'}".`
      }, t);


      const mailService = require("../../core/services/mail.service");
      await mailService.sendInviteEmail(user.email, user.firstname, companyName, inviteToken);

      console.log(`[EMAIL DISPATCHED] SMTP execution sent to ${email} with real token: ${inviteToken}`);

      await t.commit();

      res.status(200).json({ message: "Invite sent directly to their email successfully", inviteToken });
    } catch (error) {
      if (t) await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Error inviting user. Process aborted.", error });
    }
  }

  async getInviteInfo(req, res) {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: "Token is required." });
      }

      const user = await db.user.findOne({
        where: { inviteToken: token, isInviteAccepted: false },
        attributes: ["id", "firstname", "lastname", "email"]
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching invite information.", error });
    }
  }

  async acceptInvite(req, res) {
    try {
      const { inviteToken, firstname, lastname, mobile, password } = req.body;

      if (!inviteToken || !firstname || !lastname || !mobile || !password) {
        return res.status(400).json({ message: "All fields are required to accept the invite." });
      }

      const user = await db.user.findOne({ where: { inviteToken, isInviteAccepted: false } });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired invite token." });
      }

      await user.update({
        firstname,
        lastname,
        mobile,
        password: bcrypt.hashSync(password, 8),
        isInviteAccepted: true,
        isActive: true,
        inviteToken: null
      });

      await this.logHistory({
        user_id: user.id,
        performed_by: user.id,
        company_id: user.company_id,
        action: "INVITE_ACCEPTED",
        description: `${firstname} ${lastname} accepted the invite and completed account setup.`
      });

      res.status(200).json({ message: "Invite accepted successfully. You can now login." });
    } catch (error) {
      res.status(500).json({ message: "Error accepting invite.", error });
    }
  }

  async getTeamUsers(req, res) {
    try {
      const company_id = req.user.company_id;
      if (!company_id) {
        return res.status(401).json({ message: "Unauthorized. Company context missing." });
      }

      const users = await db.user.findAll({
        where: { company_id },
        attributes: { exclude: ["password", "inviteToken"] },
        include: [{ model: db.role, as: "role", attributes: ["name"] }]
      });

      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching team members", error });
    }
  }

  async toggleUserStatus(req, res) {
    try {
      const company_id = req.user.company_id;
      const { id } = req.params;
      const { isActive } = req.body;

      const user = await db.user.findOne({ where: { id, company_id } });
      if (!user) {
        return res.status(404).json({ message: "User not found or unassociated with your company" });
      }

      if (user.id === req.user.id) {
        return res.status(400).json({ message: "Cannot disable your own active session." });
      }

      await user.update({ isActive });

      await this.logHistory({
        user_id: user.id,
        performed_by: req.user.id,
        company_id,
        action: isActive ? "STATUS_ACTIVATED" : "STATUS_DEACTIVATED",
        description: `${user.firstname} ${user.lastname}'s account was ${isActive ? 'activated' : 'deactivated'}.`
      });

      res.status(200).json({ message: `Team member ${isActive ? 'enabled' : 'disabled'} successfully.` });
    } catch (error) {
      res.status(500).json({ message: "Error toggling user status", error });
    }
  }

  async updateUser(req, res) {
    try {
      const company_id = req.user.company_id;
      const { id } = req.params;

      const userData = req.body.data ? JSON.parse(req.body.data) : req.body;
      const { firstname, lastname, email, mobile, role_id } = userData;

      const user = await db.user.findOne({ where: { id, company_id } });
      if (!user) {
        return res.status(404).json({ message: "User not found or unauthorized." });
      }

      const oldRoleId = user.role_id;

      let avatarPath = user.avatar;
      if (req.file) {
        avatarPath = `/uploads/avatars/${req.file.filename}`;
      }

      await user.update({
        firstname,
        lastname,
        email: email ? email.toLowerCase().trim() : user.email,
        mobile: mobile !== undefined ? mobile : user.mobile,
        role_id,
        avatar: avatarPath
      });

      if (role_id && String(oldRoleId) !== String(role_id)) {
        const [oldRole, newRole] = await Promise.all([
          oldRoleId ? db.role.findByPk(oldRoleId) : null,
          db.role.findByPk(role_id)
        ]);

        await this.logHistory({
          user_id: user.id,
          performed_by: req.user.id,
          company_id,
          action: "ROLE_UPDATED",
          description: `Role updated from "${oldRole ? oldRole.name : 'Unassigned'}" to "${newRole ? newRole.name : 'Unassigned'}" for ${user.firstname} ${user.lastname}.`
        });
      } else {
        const currentRole = user.role_id ? await db.role.findByPk(user.role_id) : null;
        const roleName = currentRole ? currentRole.name : 'Unassigned';
        const statusText = user.isActive ? 'Active' : 'Inactive';

        await this.logHistory({
          user_id: user.id,
          performed_by: req.user.id,
          company_id,
          action: "PROFILE_UPDATED",
          description: `Profile details updated for ${user.firstname} ${user.lastname} with email "${user.email || '—'}", mobile "${user.mobile || '—'}", role "${roleName}". Current status: ${statusText}.`
        });
      }

      res.status(200).json({ message: "User updated successfully.", data: user });
    } catch (error) {
      console.error("[UPDATE_USER_ERROR]", error);
      res.status(500).json({ message: "Error updating user.", error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const id = req.user.id;
      const userData = req.body.data ? JSON.parse(req.body.data) : req.body;
      const { firstname, lastname, email, mobile } = userData;

      const user = await db.user.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      let avatarPath = user.avatar;
      if (req.file) {
        avatarPath = `/uploads/avatars/${req.file.filename}`;
      }

      await user.update({
        firstname,
        lastname,
        email: email ? email.toLowerCase().trim() : user.email,
        mobile,
        avatar: avatarPath
      });

      if (user.company_id) {
        const currentRole = user.role_id ? await db.role.findByPk(user.role_id) : null;
        const roleName = currentRole ? currentRole.name : 'Unassigned';
        const statusText = user.isActive ? 'Active' : 'Inactive';

        await this.logHistory({
          user_id: user.id,
          performed_by: user.id,
          company_id: user.company_id,
          action: "PROFILE_UPDATED",
          description: `Profile details updated for ${user.firstname} ${user.lastname} with email "${user.email || '—'}", mobile "${user.mobile || '—'}", role "${roleName}". Current status: ${statusText}.`
        });
      }

      res.status(200).json({ message: "Profile updated successfully.", data: user });
    } catch (error) {
      console.error("[UPDATE_PROFILE_ERROR]", error);
      res.status(500).json({ message: "Error updating profile.", error: error.message });
    }
  }

  async getUserHistory(req, res) {
    try {
      const requesterId = req.user.id;
      const requesterCompanyId = req.user.company_id;
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const isSuperAdmin = !requesterCompanyId;

      if (!isSuperAdmin && String(requesterId) !== String(id)) {
        return res.status(403).json({ message: "Unauthorized. You can only view your own history." });
      }

      const employeeWhere = isSuperAdmin ? { id } : { id, company_id: requesterCompanyId };

      const employee = await db.user.findOne({
        where: employeeWhere,
        attributes: ["id", "firstname", "lastname"]
      });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found or unauthorized." });
      }

      const historyWhere = isSuperAdmin ? { user_id: id } : { user_id: id, company_id: requesterCompanyId };

      const { count, rows } = await db.employee_history.findAndCountAll({
        where: historyWhere,
        include: [
          { model: db.user, as: "performer", attributes: ["firstname", "lastname"] }
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset: (page - 1) * limit
      });

      const data = rows.map((r) => {
        const performerName = r.performer
          ? `${r.performer.firstname} ${r.performer.lastname}`
          : `${employee.firstname} ${employee.lastname}`;

        return {
          id: r.id,
          type: r.action,
          message: r.description,
          created_by: performerName,
          created_at: r.createdAt,
          updated_by: performerName,
          updated_at: r.updatedAt,
        };
      });

      res.status(200).json({
        data,
        employee: { id: employee.id, name: `${employee.firstname} ${employee.lastname}` },
        pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
      });
    } catch (error) {
      console.error("[GET_USER_HISTORY_ERROR]", error);
      res.status(500).json({ message: "Error fetching employee history.", error: error.message });
    }
  }
}
module.exports = new UserController();