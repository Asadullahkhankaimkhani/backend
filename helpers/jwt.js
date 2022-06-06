const expressJwt = require("express-jwt");
const Admin = require("../models/AdminModel");
const SuperAdmin = require("../models/SuperAdminModel");

function authJwt() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${api}/auth/register`,
      `${api}/auth/login`,
      `${api}/superadmin/login`,
      `${api}/admin/login`,
      `${api}/superadmin/register`,

      // {
      //   url: /^\/api\/v1\/group\/.*/,
      //   methods: ["GET", "PUT", "DELETE"],
      // },
      {
        url: /^\/api\/v1\/user\/password\/.*/,
        methods: ["GET", "PUT"],
      },
    ],
  });
}

async function isRevoked(req, user, done) {
  if (!user) {
    done(null, true);
  }
  done();
}

const admin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user.id);
    if (user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "admin Middleware Error",
      err,
    });
  }
};

const superAdmin = async (req, res, next) => {
  try {
    const user = await SuperAdmin.findById(req.user.superAdmin.id);
    if (user.role === "superAdmin") {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "SuperAdmin Middleware Error",
      err,
    });
  }
};

module.exports = { authJwt, admin, superAdmin };
