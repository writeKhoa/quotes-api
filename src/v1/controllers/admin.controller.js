require("dotenv").config();
const { protectors } = require("../models");
const { token } = require("../utils");

const ADMIN = process.env.admin;
const PASSWORD = process.env.password;

module.exports = {
  login: async (req, res) => {
    try {
      const { admin, password } = req.body;
      const isWrongInfo = admin !== ADMIN || password !== PASSWORD;

      if (isWrongInfo) {
        return res.status(400).json({ message: "Wrong info" });
      }

      const accessToken = token.generateAccessToken({ admin });
      const refreshToken = token.generateRefreshToken({ admin });

      await protectors.findOneAndUpdate(
        { admin },
        {
          refreshToken,
        },
        { upsert: true }
      );

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  relogin: async (req, res) => {
    try {
      const accessToken = token.generateAccessToken({ admin: ADMIN });
      const refreshToken = token.generateRefreshToken({ admin: ADMIN });
      await protectors.findOneAndUpdate({ admin: ADMIN }, { refreshToken });
      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  refreshAccessToken: async (req, res) => {
    try {
      const accessToken = token.generateAccessToken({ admin: ADMIN });
      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      await protectors.findOneAndUpdate(
        { admin: ADMIN },
        {
          refreshAccessToken: "",
        }
      );
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
