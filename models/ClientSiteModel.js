const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSiteSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    siteImage: {
      type: String,
    },
    siteName: {
      type: String,
      required: true,
    },
    shiftStart: {
      type: Date,
    },
    shiftEnd: {
      type: Date,
    },
    perHourRate: {
      type: Number,
      required: true,
    },
    siteRadius: {
      type: Number,
      required: true,
    },
    siteLocation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClientSite", ClientSiteSchema);
