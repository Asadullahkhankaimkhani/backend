const ClientSite = require("../models/ClientSiteModel");

exports.createClientSite = async (req, res) => {
  try {
    const newClientSite = new ClientSite(req.body);
    const clientSite = await newClientSite.save();
    return res.status(200).send(clientSite);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateClientSite = async (req, res) => {
  try {
    const clientSite = await ClientSite.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).send(clientSite);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getOneClientSite = async (req, res) => {
  try {
    const clientSite = await ClientSite.findOne({
      _id: req.params.id,
    }).populate("client");
    return res.status(200).send(clientSite);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllClientSites = async (req, res) => {
  try {
    const clientSites = await ClientSite.find().populate("client");
    return res.status(200).send(clientSites);
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.deleteClientSite = async (req, res) => {
  try {
    await ClientSite.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(200).send({
      message: "Client Site deleted successfully",
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
