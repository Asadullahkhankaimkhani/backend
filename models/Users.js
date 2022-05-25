const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  companyInfo,
  educationInfo,
  skillsInfo,
} = require("../models/SharedArray");

const userSchema = Schema(
  {
    BSG_card_number: {
      type: String,
      required: true,
      unique: true,
    },
    user_pass: {
      type: String,
      required: true,
      minlength: 6,
    },
    user_forgot: {
      type: String,
    },
    user_displayname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    father_name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    user_email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    user_profile_url: {
      type: String,
    },
    user_registration_date: {
      type: Date,
      default: Date.now,
    },
    user_activation_key: {
      type: String,
    },
    user_cnic: {
      type: String,
      unique: true,
    },
    user_district: {
      type: String,
    },
    user_gender: {
      type: String,
    },
    user_address: {
      type: String,
    },
    user_phone: {
      type: String,
    },
    user_new_phone: {
      type: String,
    },
    user_join_date: {
      type: String,
    },
    user_DOB_DATE: {
      type: String,
    },
    user_new_DOB_DATE: {
      type: String,
    },
    user_blood_group: {
      type: String,
    },
    user_profile_img: {
      type: String,
    },
    user_status: {
      type: String,
    },
    isAdmin: { type: Boolean, default: false },
    forgotPassword: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    is_firstlogin: {
      type: Boolean,
      default: true,
    },
    isEb: {
      type: Boolean,
    },
    work_experience: [companyInfo],
    education: [educationInfo],
    skills: [skillsInfo],
    badges: [],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
