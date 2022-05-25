const AboutUs = require("../models/AboutUs");

exports.create = async (req, res) => {
  const aboutUs = new AboutUs({
    ...req.body,
  });
  try {
    await aboutUs.save();
    res.status(201).send(aboutUs);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findByIdAndUpdate(
      req.params._id,
      { about_para: req.body.about_para, app_version: req.body.app_version },
      { new: true }
    ).exec();
    console.log(aboutUs);
    res.json(aboutUs);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const aboutUs = await AboutUs.find({});
    res.status(200).json(aboutUs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
