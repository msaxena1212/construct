const jwt = require("jsonwebtoken");
const db = require("../../models");

// --------------------------------------
// EXCLUDED ROUTES (NO AUTH REQUIRED)
// --------------------------------------
const excludedRoutes = [
  "/api/v1/register-company",
  "/api/auth/signin",
  "/api/auth/sendOTP",
  "/api/auth/forgotpassword",
  "/api/v1/accept-invite",
  "/api/v1/invite-info"
];

function isExcluded(req) {
  return excludedRoutes.some((route) => req.originalUrl.startsWith(route));
}

// =====================================
// MAIN MIDDLEWARE
// =====================================
const verifyAuthToken = async (req, res, next) => {
  try {
    // ✅ Skip excluded routes
    if (isExcluded(req)) return next();

    // -----------------------------------
    // CHECK TOKEN
    // -----------------------------------
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized - Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    // -----------------------------------
    // VERIFY TOKEN (SYNC STYLE)
    // -----------------------------------
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired",
        });
      }

      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // -----------------------------------
    // GET USER
    // -----------------------------------
    const userData = await db.user.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.company,
          as: "company",
          attributes: ["id", "name", "isDeleted"],
        },
        {
          model: db.role,
          as: "role", // make sure association exists
          attributes: ["id", "name"],
        },
      ],
    });

    if (!userData) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // -----------------------------------
    // COMPANY CHECK
    // -----------------------------------
    if (
      userData.company &&
      userData.company.isDeleted === true
    ) {
      return res.status(403).json({
        message: "Your organization is inactive",
      });
    }

    // -----------------------------------
    // ATTACH USER TO REQUEST
    // -----------------------------------
    req.user = {
      id: userData.id,
      email: userData.email,
      company_id: userData.company_id,
      role_id: userData.role_id,
      role_name: userData.role?.name || null,
    };

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = verifyAuthToken;