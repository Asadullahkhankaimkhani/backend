const jwt = require("jsonwebtoken");
const User = require("./models/Users");

async function verify(req, res, next) {
  const user = await User.findOne({ _id: req.user.id });
  const authHeader = req.headers["authorization"].split(" ")[1];
  if (authHeader !== user.accessToken) {
    return res.status(401).json("You are not authenticated!");
  } else {
    next();
  }
}

module.exports = verify;
