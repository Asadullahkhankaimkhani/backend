const express = require("express");
const router = express.Router();
const { admin } = require("../helpers/jwt");
const {
  createBranding,
  deleteBrandingById,
  getBranding,
  updateBrandingById,
  getBrandingById,
} = require("../controller/BrandingController");

router.post("/branding", admin, createBranding);
router.get("/branding", admin, getBranding);
router.get("/branding/:id", admin, getBrandingById);
router.put("/branding/:id", admin, updateBrandingById);
router.delete("/branding/:id", admin, deleteBrandingById);

module.exports = router;
