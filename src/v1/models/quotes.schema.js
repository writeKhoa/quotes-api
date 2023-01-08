const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const quotesBucketSchema = Schema(
  {
    page: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    quotes: [
      {
        quote: {
          type: String,
          require: true,
          unique: true,
          default: "",
        },
        author: {
          type: String,
          default: "Khuyết danh",
        },
        timeCreate: {
          type: String,
          default: () => {
            const date = new Date();
            return date.toISOString();
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("quotesBucket", quotesBucketSchema);
