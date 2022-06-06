const GroupRoles = require("../models/GroupRolesModel");

exports.createGroupRole = async (req, res) => {
  try {
    const groupRole = new GroupRoles(req.body);
    await groupRole.save();
    res.status(201).send(groupRole);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getGroupRoles = async (req, res) => {
  try {
    const groupRoles = await GroupRoles.find();
    res.send(groupRoles);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getGroupRole = async (req, res) => {
  try {
    const groupRole = await GroupRoles.findById(req.params.id);
    if (!groupRole) {
      return res.status(404).send();
    }
    res.send(groupRole);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateGroupRole = async (req, res) => {
  try {
    const groupRole = await GroupRoles.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!groupRole) {
      return res.status(404).send();
    }
    res.send(groupRole);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteGroupRole = async (req, res) => {
  try {
    const groupRole = await GroupRoles.findByIdAndDelete(req.params.id);
    if (!groupRole) {
      return res.status(404).send();
    }
    res.send(groupRole);
  } catch (error) {
    res.status(500).send(error);
  }
};
