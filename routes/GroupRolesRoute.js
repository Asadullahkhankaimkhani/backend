const express = require("express");
const Router = express.Router();
const {
  createGroupRole,
  deleteGroupRole,
  getGroupRole,
  getGroupRoles,
  updateGroupRole,
} = require("../controller/GroupRolesController.js");
const { admin } = require("../helpers/jwt");

// GroupRoles Routes
Router.post("/group", admin, createGroupRole);
Router.delete("/group/:id", admin, deleteGroupRole);
Router.get("/group/:id", admin, getGroupRole);
Router.get("/group", admin, getGroupRoles);
Router.put("/group/:id", admin, updateGroupRole);

module.exports = Router;
