const express = require("express");
const router = express.Router();
const {
  loginSuperAdmin,
  registerSuperAdmin,
} = require("../controller/SuperAdminController");

// Register SuperAdmin
router.post("/superadmin/register", registerSuperAdmin);
router.post("/superadmin/login", loginSuperAdmin);

module.exports = router;
