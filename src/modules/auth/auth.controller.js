const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
      }

      const user = await db.user.findOne({ where: { email: email.toLowerCase().trim() }, include: [{ model: db.role, as: "role" }, { model: db.company, as: "company" }] });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      // If user belongs to a company, ensure the company is active
      if (user.company && user.company.isActive === false) {
        return res.status(403).json({ message: "Your company environment has been deactivated. Please contact platform administration." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).json({
        id: user.id,
        name: user.company ? user.company.name : 'Zyno Super Admin',
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role_id: user.role_id,
        company_id: user.company_id,
        accessToken: token,
        roleName: user.role.name,
        avatar: user.avatar
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();