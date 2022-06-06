const router = require("express").Router();

const { login, forgotPassword } = require("../controller/AuthController");

//LOGIN
router.post("/auth/login", login);

//FORGOT PASSWORD
router.post("/auth/forgotpassword", forgotPassword);

module.exports = router;
