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
  }

  async registerCompany(req, res) {
    try {
      let { firstname, lastname, email, mobile, password, name } = req.body;

      if (!firstname || !lastname || !email || !mobile || !password || !name) {
        return res.status(400).json({ message: "All fields are required." });
      }
      email = email.toLowerCase().trim();
      name = name.trim();
      // Check if company with the same email already exists
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
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
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
      // Super Admin check: typically company_id is null for super admins.
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

      // Fetch company name dynamically for the email
      const company = await db.company.findByPk(company_id, { transaction: t });
      const companyName = company ? company.name : "Your Team";

      // LIVE FIRE NODE MAILER TRANSPORT
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
      res.status(200).json({ message: `Team member ${isActive ? 'enabled' : 'disabled'} successfully.` });
    } catch (error) {
      res.status(500).json({ message: "Error toggling user status", error });
    }
  }
}
module.exports = new UserController();
