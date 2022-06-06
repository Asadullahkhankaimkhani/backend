const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandingSchema = new Schema(
  {
    primaryColor: {
      type: String,
      required: true,
    },
    secondaryColor: {
      type: String,
      required: true,
    },
    tertiaryColor: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Branding", brandingSchema);
