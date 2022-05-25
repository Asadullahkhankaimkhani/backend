const express = require("express");
const router = express.Router();
const { create, update, getAll } = require("../controller/aboutUs");

router.post("/aboutus", create);
router.put("/aboutus", update);
router.get("/aboutus", getAll);

module.exports = router;
