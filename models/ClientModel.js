const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    profileImage: {
      type: String,
    },
    clientName: {
      type: String,
      trim: true,
    },
    itemise: {
      type: String,
    },
    clientAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", ClientSchema);
