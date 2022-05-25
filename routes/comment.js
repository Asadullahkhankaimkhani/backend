const express = require("express");
const router = express.Router();
const { create, remove, getAll } = require("../controller/comment");

router.post("/comment", create);
router.delete("/comment", remove);
router.get("/comment", getAll);

module.exports = router;
