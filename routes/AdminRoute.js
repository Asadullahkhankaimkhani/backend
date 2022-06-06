const express = require("express");
const router = express.Router();
const { superAdmin } = require("../helpers/jwt");
const { loginAdmin, registerAdmin } = require("../controller/AdminController");

// Register SuperAdmin
router.post("/admin/register", superAdmin, registerAdmin);
router.post("/admin/login", loginAdmin);

module.exports = router;
