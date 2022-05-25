// create Comment Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutUsSchema = new Schema(
  {
    about_para: {
      type: String,
    },
    app_version: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("AboutUs", AboutUsSchema);
