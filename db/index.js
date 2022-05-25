const mongoose = require("mongoose");

exports.DbConnection = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("###  DATABASE CONNECTED ###");
};
