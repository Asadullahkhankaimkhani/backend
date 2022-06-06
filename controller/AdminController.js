const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      err: error.message,
    });
  }
};

// Login Admin
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Admin does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const { name, _id, role } = admin;

    const accessToken = jwt.sign({ id: _id, role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    await Admin.findOne({ email }).updateOne({
      accessToken: accessToken,
    });

    return res.status(200).json({ name, _id, accessToken });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Email does not exist. Please try again! ${error.message}`,
    });
  }
};
