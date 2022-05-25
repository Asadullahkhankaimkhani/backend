const express = require("express");
const morgan = require("morgan");
const { DbConnection } = require("./db");
const { readdirSync } = require("fs");
const app = express();
require("dotenv").config();
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const path = require("path");
const api = process.env.API_URL;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  "/public/images/badges",
  express.static(path.join("public", "images", "badges"))
);

app.get("/", (req, res) => res.send("Backend Working"));
app.use(authJwt());
app.use(errorHandler);

DbConnection();

readdirSync("./routes").map((r) => app.use(`${api}`, require(`./routes/${r}`)));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
