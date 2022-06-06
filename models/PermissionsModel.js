const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.PermissionsSchema = new Schema(
  {
    featureName: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    write: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
