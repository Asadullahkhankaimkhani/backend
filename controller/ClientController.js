const Client = require("../models/ClientModel");

exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.send(client);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(client);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getOneClient = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });
    res.send(client);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.send(clients);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id });
    res.send(client);
  } catch (err) {
    res.status(400).send(err);
  }
};
