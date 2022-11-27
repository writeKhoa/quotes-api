const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const quotesSchema = Schema(
  {
    quote: {
      type: String,
      require: true,
      unique: true,
      default: "",
    },
    author: {
      type: String,
      require: true,
      default: "Khuyết danh",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("quotes", quotesSchema);
