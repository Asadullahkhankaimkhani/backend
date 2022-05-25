const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

const uniqueid = require("uniqid");

exports.register = async (req, res) => {
  const newUser = new User({
    user_displayname: req.body.user_displayname,
    father_name: req.body.father_name,
    user_email: req.body.user_email,
    user_district: req.body.user_district,
    BSG_card_number: req.body.BSG_card_number,
    user_cnic: req.body.user_cnic,
    user_pass: CryptoJS.AES.encrypt(
      req.body.user_pass,
      process.env.SECRET_KEY
    ).toString(),
    user_district: req.body.user_district,
    user_gender: req.body.user_gender,
    user_address: req.body.user_address,
    user_phone: req.body.user_phone,
  });

  try {
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ user_email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Email/password is incorrect. Please try again!",
      });
    } else if (user.isAdmin === false) {
      return res
        .status(401)
        .json({ success: false, msg: "Only Admin is allowed!" });
    }
    const bytes = CryptoJS.AES.decrypt(user.user_pass, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({
        success: false,
        msg: "Email/password is incorrect. Please try again!",
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    await User.findOne({ user_email: req.body.email }).updateOne({
      accessToken: accessToken,
    });
    const { user_email, _id } = user;

    return res.status(200).json({ user_email, _id, accessToken });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: `Email does not exist. Please try again! ${err.message}`,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const code = uniqueid();
  const user = await User.findOne({ user_email: email }).where({
    isAdmin: true,
  });
  if (!user) {
    return res.status(404).send("User not found");
  }
  await User.findOne({ user_email: email })
    .where({ isAdmin: true })
    .updateOne({ user_forgot: code });
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
exports.saveUserNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    await User.findOne({ user_email: email }).updateOne({
      user_pass: CryptoJS.AES.encrypt(
        newPassword,
        process.env.SECRET_KEY
      ).toString(),
    });

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again.");
  }
};

// create a update password function
exports.updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ user_email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const bytes = CryptoJS.AES.decrypt(user.user_pass, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== oldPassword) {
      return res.status(400).send("Invalid Password");
    }
    await User.findOne({ user_email: email })
      .where({ isAdmin: true })
      .updateOne({
        user_pass: CryptoJS.AES.encrypt(
          newPassword,
          process.env.SECRET_KEY
        ).toString(),
      });
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again.");
  }
};
