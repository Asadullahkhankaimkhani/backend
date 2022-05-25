const express = require("express");
const {
  getAllUsers,
  getOneUser,
  getUserStats,
  deleteUser,
  updateUser,
  userLogin,
  forgotPassword,
  pushToBadge,
  pushToEducation,
  pushToSkills,
  pushToWork,
  deleteFromBadge,
  deleteFromEducation,
  deleteFromSkills,
  deleteFromWork,
  userCheck,
  saveUserPassword,
  saveUserMobile,
  ebUserCheck,
  ebUserLogin,
  checkPhone,
} = require("../controller/user");
const route = express.Router();
const verify = require("../verifyToken");

// User Routes
route.post("/user/find", userCheck);
route.post("/user/findEB", ebUserCheck);
route.post("/user/login", userLogin);
route.post("/user/loginEB", ebUserLogin);
route.post("/user/forgotPassword", forgotPassword);
route.get("/users", verify, getAllUsers);
route.get("/users/find/:id", getOneUser);
route.get("/users/stats", getUserStats);
route.delete("/users/:id", deleteUser);
route.put("/users/:id", updateUser);
route.put("/user/password/:id", saveUserPassword);
route.put("/user/mobile/:id", saveUserMobile);
route.post("/user/checkphone", checkPhone);

// New Routes
route.put("/user/education/:id", pushToEducation);
route.put("/user/education/del/:id", deleteFromEducation);
route.put("/user/skills/:id", pushToSkills);
route.put("/user/skills/del/:id", deleteFromSkills);
route.put("/user/work/:id", pushToWork);
route.put("/user/work/del/:id", deleteFromWork);
route.put("/user/badge/:id", pushToBadge);
route.put("/user/badge/del/:id", deleteFromBadge);

module.exports = route;
