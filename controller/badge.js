const Badge = require("../models/Badge");

exports.createBadge = (req, res) => {
  let name = req.body.name;
  let image = req.file.path;
  console.log(name, image);
  const badge = new Badge({
    name: name,
    image: image,
  });
  badge.save((err, badge) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        errors: err.meesage,
      });
    }
    return res.json({
      message: "Created badge successfully",
      badge,
    });
  });
};

//GET BADGE
exports.getOneBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    const { id, ...info } = badge._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL BADGES
exports.getAllBadges = async (req, res) => {
  const query = req.query.new;
  // if (req.user.isAdmin) {
  try {
    const badges = query
      ? await Badge.find().sort({ _id: -1 }).limit(5)
      : await Badge.find();
    res.status(200).json(badges);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("You are not allowed to see all badges!");
  // }
};

//UPDATE BADGE
exports.updateBadge = async (req, res) => {
  try {
    const updatedBadge = await Badge.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, image: req.file.path },
      { new: true }
    ).exec();
    res.json(updatedBadge);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: err.message,
    });
  }
  // console.log(req.body);
};

//DELETE
exports.deleteBadge = async (req, res) => {
  // if (req.user.id === req.params.id || req.user.isAdmin) {
  try {
    await Badge.findByIdAndDelete(req.params.id);
    res.status(200).json("Badge has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("An error occured while deleting badge");
  // }
};
