const SuperAdmin = require("../models/SuperAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register SuperAdmin
exports.registerSuperAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });

    if (superAdmin) {
      return res.status(400).json({
        message: "SuperAdmin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      password: hashedPassword,
      role: "superAdmin",
    });

    await newSuperAdmin.save();

    res.status(201).json({
      message: "SuperAdmin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Login SuperAdmin
exports.loginSuperAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });

    if (!superAdmin) {
      return res.status(400).json({
        message: "SuperAdmin does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const payload = {
      superAdmin: {
        id: superAdmin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          superAdmin: {
            id: superAdmin.id,
            name: superAdmin.name,
            email: superAdmin.email,
            role: superAdmin.role,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
