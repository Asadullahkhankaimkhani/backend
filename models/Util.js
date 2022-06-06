const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyContactSchema = new Schema(
  {
    name: {
      type: String,
    },
    relationship: {
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
  },
  {
    timestamps: true,
  }
);

const supervisorSchema = new Schema(
  {
    name: {
      type: String,
    },
    reportingMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const subOrdinateSchema = new Schema(
  {
    name: {
      type: String,
    },
    reportingMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const language = new Schema(
  {
    language: {
      type: String,
    },
    fluency: {
      type: String,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  emergencyContactSchema,
  supervisorSchema,
  subOrdinateSchema,
  language,
};
