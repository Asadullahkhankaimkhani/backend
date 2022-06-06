const Branding = require("../models/BrandingModel");

exports.createBranding = async (req, res) => {
  try {
    const branding = await Branding.create(req.body);
    res.status(201).json({
      success: true,
      message: "Branding created successfully",
      branding,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Branding creation failed",
      err,
    });
  }
};

exports.getBrandingById = async (req, res) => {
  try {
    const branding = await Branding.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Branding retrieved successfully",
      branding,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Branding retrieval failed",
      err,
    });
  }
};

exports.getBranding = async (req, res) => {
  try {
    const branding = await Branding.findOne({});
    res.status(200).json({
      success: true,
      message: "Branding found",
      branding,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Branding retrieval failed",
      err,
    });
  }
};

exports.updateBrandingById = async (req, res) => {
  try {
    const branding = await Branding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Branding updated",
      branding,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Branding update failed",
      err,
    });
  }
};

exports.deleteBrandingById = async (req, res) => {
  try {
    await Branding.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Branding deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Branding deletion failed",
      err,
    });
  }
};
