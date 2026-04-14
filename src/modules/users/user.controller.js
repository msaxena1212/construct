const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserController {
  constructor() {
    this.getAllUsers = this.getAllUsers.bind(this);
    this.registerCompany = this.registerCompany.bind(this);
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
      res
        .status(201)
        .json({ message: "User created successfully.", data: user });
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
}
module.exports = new UserController();
