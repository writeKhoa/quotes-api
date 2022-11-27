require("dotenv").config("");
const express = require("express");
const app = express();

if (process.env.MODE === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.json());

require("./src/v1/helpers/connect_mongodb.js");

app.use(require("./src"));

app.get("/*", (req, res) => {
  return res.status(200).json({ message: "quotes api" });  
});

module.exports = app;
