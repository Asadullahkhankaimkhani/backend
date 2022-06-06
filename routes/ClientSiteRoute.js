const express = require("express");
const router = express.Router();
const {
  createClientSite,
  deleteClientSite,
  getAllClientSites,
  getOneClientSite,
  updateClientSite,
} = require("../controller/ClientSiteController");
const { admin } = require("../helpers/jwt");

router.post("/clientSite", admin, createClientSite);
router.delete("/clientSite/:id", admin, deleteClientSite);
router.get("/clientSite", admin, getAllClientSites);
router.get("/clientSite/:id", admin, getOneClientSite);
router.put("/clientSite/:id", admin, updateClientSite);

module.exports = router;
