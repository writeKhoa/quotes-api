require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.KEY_ACCESS_TOKEN, {
      expiresIn: "20m",
    });
  },
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.KEY_REFRESH_TOKEN, {
      expiresIn: "60d",
    });
  },
};
