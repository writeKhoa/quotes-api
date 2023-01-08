const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const protectorsSchema = Schema(
  {
    admin: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    maxPage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("protectors", protectorsSchema);
