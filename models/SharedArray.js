const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.companyInfo = Schema({
  company_name: {
    type: String,
  },
  company_start_date: {
    type: String,
  },
  company_end_date: {
    type: String,
  },
  current: {
    type: Boolean,
  },
});

exports.educationInfo = Schema({
  institution_name: {
    type: String,
  },
});
exports.skillsInfo = Schema({
  skills_name: {
    type: String,
  },
});
