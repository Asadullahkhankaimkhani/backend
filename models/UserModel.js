const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  emergencyContactSchema,
  subOrdinateSchema,
  supervisorSchema,
  language,
} = require("./Util");

const userSchema = Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    driverLicense: {
      type: String,
    },
    licenseExpiry: {
      type: Date,
    },
    gender: {
      type: String,
    },
    martialStatus: {
      type: String,
    },
    nationality: {
      type: Array,
    },
    profileImage: {
      type: String,
    },
    userGroup: {
      ref: "GroupRoles",
      type: Schema.Types.ObjectId,
    },
    addressOne: {
      type: String,
    },
    addressTwo: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    homePhone: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },
    workPhone: {
      type: String,
    },
    workEmail: {
      type: String,
    },
    otherEmail: {
      type: String,
    },
    emergencyContact: [emergencyContactSchema],
    supervisor: [supervisorSchema],
    subOrdinate: [subOrdinateSchema],
    language: [language],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
