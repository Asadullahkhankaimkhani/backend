const express = require("express");
const router = express.Router();
const { admin } = require("../helpers/jwt");

const {
  createClient,
  deleteClient,
  getAllClients,
  getOneClient,
  updateClient,
} = require("../controller/ClientController");

router.post("/client", admin, createClient);
router.delete("/client/:id", admin, deleteClient);
router.get("/client", admin, getAllClients);
router.get("/client/:id", admin, getOneClient);
router.put("/client/:id", admin, updateClient);

module.exports = router;
