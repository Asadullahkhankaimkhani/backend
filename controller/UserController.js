const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      driverLicense,
      licenseExpiry,
      gender,
      martialStatus,
      nationality,
      profileImage,
      userGroup,
      addressOne,
      addressTwo,
      city,
      state,
      country,
      zipCode,
      homePhone,
      mobilePhone,
      workPhone,
      workEmail,
      otherEmail,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword,
      driverLicense,
      licenseExpiry,
      gender,
      martialStatus,
      nationality,
      profileImage,
      userGroup,
      addressOne,
      addressTwo,
      city,
      state,
      country,
      zipCode,
      homePhone,
      mobilePhone,
      workPhone,
      workEmail,
      otherEmail,
    });

    const savedUser = await newUser.save();
    res.status(200).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const userupdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "User updated",
      updatedUser: userupdated,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// exports.updateUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const {
//       firstName,
//       middleName,
//       lastName,
//       email,
//       driverLicense,
//       licenseExpiry,
//       gender,
//       martialStatus,
//       nationality,
//       profileImage,
//       userGroup,
//       addressOne,
//       addressTwo,
//       city,
//       state,
//       country,
//       zipCode,
//       homePhone,
//       mobilePhone,
//       workPhone,
//       workEmail,
//       otherEmail,
//     } = req.body;

//     user.firstName = firstName;
//     user.middleName = middleName;
//     user.lastName = lastName;
//     user.email = email;
//     user.driverLicense = driverLicense;
//     user.licenseExpiry = licenseExpiry;
//     user.gender = gender;
//     user.martialStatus = martialStatus;
//     user.nationality = nationality;
//     user.profileImage = profileImage;
//     user.userGroup = userGroup;
//     user.addressOne = addressOne;
//     user.addressTwo = addressTwo;
//     user.city = city;
//     user.state = state;
//     user.country = country;
//     user.zipCode = zipCode;
//     user.homePhone = homePhone;
//     user.mobilePhone = mobilePhone;
//     user.workPhone = workPhone;
//     user.workEmail = workEmail;
//     user.otherEmail = otherEmail;

//     const updatedUser = await user.save();
//     res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//     });
//     console.log(err);
//   }
// };

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.pushToEmergencyContact = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { emergencyContact: req.body.emergencyContact } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.deleteFromEmergencyContact = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { emergencyContact: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.pushToSupervisor = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { supervisor: req.body.supervisor } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.deleteFromSupervisor = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { supervisor: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.pushToSubOrdinate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { subOrdinate: req.body.subOrdinate } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.deleteFromSubOrdinate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { subOrdinate: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.pushToLanguage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { language: req.body.language } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};

exports.deleteFromLanguage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { language: { _id: req.body._id } } },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "No user Found!" });
  }
};
