const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const uniqueid = require("uniqid");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "userGroup"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Email is incorrect. Please try again!",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        msg: "Password is incorrect. Please try again!",
      });
    }

    const { groupRole } = user;

    const accessToken = jwt.sign(
      { id: user._id, groupRole },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    await User.findOne({ user_email: req.body.email }).updateOne({
      accessToken: accessToken,
    });

    const { user_email, _id } = user;

    return res.status(200).json({ user_email, _id, accessToken });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Email does not exist. Please try again! ${err.message}`,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const code = uniqueid();
  const user = await User.findOne({ user_email: email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  await User.findOne({ user_email: email }).updateOne({ user_forgot: code });
  sgMail.setApiKey(process.env.EMAIL_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "philemon.peter@inserito.com", // Change to your verified sender
    subject: "Your BSG Password Reset Code",
    text: "Code",
    html: `<html>
      <h1>Reset password</h1>
      <p>Use this code to reset your password</p>
      <h2 style="color:red;">${code}</h2>
      <i>BSG Dashboard</i>
    </html>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      return res.json({ ok: true });
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.codeVerification = async (req, res) => {
  try {
    const { email, code } = req.body;
    const VaildUser = await User.findOne({ user_email: email }).where({
      user_forgot: code,
    });

    if (!VaildUser) {
      return res.status(400).send("Invalid Code");
    }

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again.");
  }
};
