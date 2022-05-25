const router = require("express").Router();

const {
  register,
  login,
  forgotPassword,
  saveUserNewPassword,
  codeVerification,
  updatePassword,
} = require("../controller/auth");

//REGISTER
router.post("/auth/register", register);

//LOGIN
router.post("/auth/login", login);

//FORGOT PASSWORD
router.post("/auth/forgotpassword", forgotPassword);
router.post("/auth/codeVerification", codeVerification);
router.post("/auth/saveUserNewPassword", saveUserNewPassword);

// Update password
router.put("/auth/updatePassword", updatePassword);

module.exports = router;
