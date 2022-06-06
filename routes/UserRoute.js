const express = require("express");
const {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  deleteFromEmergencyContact,
  deleteFromLanguage,
  deleteFromSubOrdinate,
  deleteFromSupervisor,
  pushToEmergencyContact,
  pushToLanguage,
  pushToSubOrdinate,
  pushToSupervisor,
} = require("../controller/UserController");
const route = express.Router();
const { admin } = require("../helpers/jwt");

// User Routes
route.post("/user", admin, createUser);
route.get("/user", admin, getUsers);
route.get("/user/find/:id", getUser);
route.delete("/user/:id", admin, deleteUser);
route.put("/user/:id", updateUser);
route.put("/user/emergencyContact/:id", pushToEmergencyContact);
route.put("/user/language/:id", pushToLanguage);
route.put("/user/subOrdinate/:id", pushToSubOrdinate);
route.put("/user/supervisor/:id", pushToSupervisor);
route.delete("/user/emergencyContact/:id", deleteFromEmergencyContact);
route.delete("/user/language/:id", deleteFromLanguage);
route.delete("/user/subOrdinate/:id", deleteFromSubOrdinate);
route.delete("/user/supervisor/:id", deleteFromSupervisor);

module.exports = route;
