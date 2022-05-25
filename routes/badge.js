const express = require("express");
const router = express.Router();
const uploadMulter = require("../middlewares/upload.js");
const validation = require("../middlewares/validation.js");
const formidableMiddleware = require("express-formidable");
const {
  createBadge,
  getAllBadges,
  getOneBadge,
  updateBadge,
  deleteBadge,
} = require("../controller/badge");

router.post("/addbadge", uploadMulter, validation, createBadge);
router.get("/badges", getAllBadges);
router.get("/badge/:id", getOneBadge);
router.put("/badge/update/:id", uploadMulter, validation, updateBadge);
router.delete("/deletebadge/:id", deleteBadge);

module.exports = router;
