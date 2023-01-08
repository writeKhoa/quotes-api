require("dotenv").config();
const jwt = require("jsonwebtoken");
const { protectors } = require("../models");

module.exports = {
  verifyAccessToken: async function (req, res, next) {
    try {
      const header = req.header("Authorization");
      const accessToken = header && header.split(" ")[1];

      if (!accessToken) {
        return res.status(400).json({ message: "Missed access token" });
      }

      const isVerify = jwt.verify(accessToken, process.env.KEY_ACCESS_TOKEN);

      if (!isVerify) {
        return res.status(500).json({ message: "Unauthorization" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  verifyRefreshToken: async function (req, res, next) {
    try {
      const header = req.header("Authorization");
      const refreshToken = header && header.split(" ")[1];

      if (!refreshToken) {
        return res.status(400).json({ message: "Missed refresh token" });
      }

      const isVerify = jwt.verify(refreshToken, process.env.KEY_REFRESH_TOKEN);

      if (!isVerify) {
        return res.status(400).json({ message: "Invalid refresh token" });
      }

      const isAdmin = await protectors.findOne({ admin: isVerify.admin });

      if (!isAdmin) {
        return res.status(400).json({ message: "RefreshToken wrong" });
      }

      const refreshTokenIsMatched = isAdmin.refreshToken === refreshToken;

      if (!refreshTokenIsMatched) {
        return res.status(400).json({ message: "Old refresh token" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
