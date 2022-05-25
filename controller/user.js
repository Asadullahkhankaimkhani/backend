const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const uniqueid = require("uniqid");
const mongoose = require("mongoose");

// Find EB user by gender bsg number and district
exports.ebUserCheck = async (req, res) => {
  const { user_bsg } = req.body;

  try {
    const user = await User.aggregate([
      {
        $match: {
          isEB: true,
          user_gender: "Male",
          BSG_card_number: user_bsg,
        },
      },
    ]);
    if (user[0].isEB === true) {
      return user[0].is_firstlogin === false
        ? res.status(200).json({
            password_success: true,
            message: "User exists",
            _id: user[0]._id,
          })
        : res.status(200).json({
            password_success: false,
            message: "User exists but first login",
            _id: user[0]._id,
          });
    } else {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Find eb user by gender bsg number and district
exports.ebUserLogin = async (req, res) => {
  const { user_bsg, password } = req.body;

  try {
    const user = await User.aggregate([
      {
        $match: {
          isEB: true,
          user_gender: "Male",
          BSG_card_number: user_bsg,
        },
      },
    ]);
    // Check User Journey
    if (user[0].isEB === true) {
      const bytes = CryptoJS.AES.decrypt(
        user[0].user_pass,
        process.env.SECRET_KEY
      );
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== password) {
        return res.status(401).json({
          success: false,
          msg: "Email/password is incorrect. Please try again!",
        });
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
      });

      const { _id } = user[0];

      return res.status(200).json({ _id, accessToken });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Find user by gender bsg number and district
exports.userCheck = async (req, res) => {
  const { user_district, user_gender, user_bsg } = req.body;

  try {
    const user = await User.findOne({
      $and: [
        { user_district: user_district },
        { user_gender: user_gender },
        { BSG_card_number: user_bsg },
      ],
    });

    if (user) {
      return user.is_firstlogin === false
        ? res.status(200).json({
            password_success: true,
            message: "User exists",
            _id: user._id,
          })
        : res.status(200).json({
            password_success: false,
            message: "User exists but first login",
            _id: user._id,
          });
    } else {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Find user by gender bsg number and district
exports.userLogin = async (req, res) => {
  const { user_district, user_gender, user_bsg, password } = req.body;

  try {
    const user = await User.findOne({
      $and: [
        { user_district: user_district },
        { user_gender: user_gender },
        { BSG_card_number: user_bsg },
      ],
    });
    // Check User Journey

    const bytes = CryptoJS.AES.decrypt(user.user_pass, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json({
        success: false,
        msg: "Email/password is incorrect. Please try again!",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const { _id } = user;

    return res.status(200).json({ _id, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get user mobile number by id
exports.saveUserMobile = async (req, res) => {
  const userCheckPhone = await User.findOne({
    user_new_phone: req.body.user_phone,
  });

  if (userCheckPhone) {
    return res.status(400).json({
      success: false,
      message: "User with this phone number already exists",
    });
  } else {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        user_new_phone: req.body.user_phone,
      },
      { new: true }
    );
    if (!user) {
      return res.status(400).send("The user cannot be Updated");
    }
    return res.send(user);
  }
};

// Save User Password
exports.saveUserPassword = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      user_pass: CryptoJS.AES.encrypt(
        req.body.user_pass,
        process.env.SECRET_KEY
      ).toString(),
      is_firstlogin: false,
    },
    { new: true }
  );
  if (!user) {
    return res.status(400).send("The password cannot be Updated");
  }
  return res.send(user);
};

// User login email and username and password
// exports.userLogin = async (req, res) => {
//   const { password, username } = req.body;
//   try {
//     const user = await User.findOne({
//       $or: [{ user_email: username }, { BSG_card_number: username }],
//     });

//     const bytes = CryptoJS.AES.decrypt(user.user_pass, process.env.SECRET_KEY);
//     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//     if (originalPassword !== password) {
//       return res.status(401).json({
//         success: false,
//         msg: "Email/password is incorrect. Please try again!2",
//       });
//     }

//     const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });
//     await User.findOne({ user_email: req.body.email }).updateOne({
//       accessToken: accessToken,
//     });
//     const { user_email, _id } = user;

//     res.status(200).json({ user_email, _id, accessToken });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//     console.log(err);
//   }
// };
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
      return console.error(error);
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

//GET

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET ALL
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find({ isAdmin: false });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You are not allowed to see all users!");
  }
};

//GET USER STATS
exports.getUserStats = async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//DELETE
exports.deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

//UPDATE

exports.updateUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.send(400).send("Invalid ID");
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      user_displayname: req.body.user_displayname,
      user_pass: CryptoJS.AES.encrypt(
        req.body.user_pass,
        process.env.SECRET_KEY
      ).toString(),
      father_name: req.body.father_name,
      user_join_date: req.body.user_join_date,
      user_email: req.body.user_email,
      user_district: req.body.user_district,
      user_gender: req.body.user_gender,
      user_address: req.body.user_address,
      user_phone: req.body.user_phone,
      user_new_DOB_DATE: req.body.user_new_DOB_DATE,
      user_blood_group: req.body.user_blood_group,
      user_profile_img: req.body.user_profile_img,
      user_status: req.body.user_status,
    },
    { new: true }
  );
  if (!user) {
    return res.status(400).send("The user cannot be Updated");
  }
  return res.send(user);
};

//Push to education array

exports.pushToEducation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { education: req.body.education } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};
//Delete from education array
exports.deleteFromEducation = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { education: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

//Push to skills array

exports.pushToSkills = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { skills: req.body.skills } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};
//Delete from skills array
exports.deleteFromSkills = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { skills: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.pushToWork = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { work_experience: req.body.work_experience } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

//Delete from work_experience array
exports.deleteFromWork = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { work_experience: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: "No user Found!" });
  }
};

//Push to badge array

exports.pushToBadge = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { badges: req.body } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};
//Delete from badge array
exports.deleteFromBadge = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { badges: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.checkPhone = async (req, res) => {
  try {
    const user = await User.findOne({ user_new_phone: req.body.user_phone });
    return user
      ? res.status(200).json({
          _id: user._id,
          status: true,
        })
      : res.status(400).json({ status: false, msg: "No user Found!" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error Please Try Again!" });
  }
};
