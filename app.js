const express = require("express");
const morgan = require("morgan");
const app = express();


app.use(morgan("dev"));
app.use(express.json());

require("./src/v1/helpers/connect_mongodb.js");

app.use(require("./src"));

module.exports = app;
