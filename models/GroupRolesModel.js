const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { PermissionsSchema } = require("./PermissionsModel");

const GroupRolesSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    permissions: [PermissionsSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GroupRoles", GroupRolesSchema);
