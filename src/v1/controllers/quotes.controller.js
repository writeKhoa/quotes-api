require("dotenv").config("");
const { quotesBucket, protectors } = require("../models");

const MAX_SIZE = 10;
const ADMIN = process.env.admin;

const that = {
  createQuote: async (req, res) => {
    try {
      const { data, page } = req.body;

      const isInvalid = data.quote === "";
      if (isInvalid) {
        return res.status(401).json({ message: "Fill full form, please" });
      }

      // first
      if (page === 0) {
        const newQuotesBucket = new quotesBucket({
          page: 1,
          count: 1,
          quotes: [data],
        });
        await newQuotesBucket.save();
        await protectors.findOneAndUpdate(
          { admin: ADMIN },
          {
            maxPage: page + 1,
          }
        );
        return res.status(200).json({ maxPage: page + 1 });
      }

      // update
      const quotesBucketObject = await quotesBucket.findOneAndUpdate(
        { page, count: { $lt: MAX_SIZE } },
        {
          $push: {
            quotes: {
              $each: [data],
              $position: 0,
            },
          },
          $inc: { count: 1 },
        },
        { returnDocument: "after" }
      );

      // if not find
      if (!quotesBucketObject) {
        const newQuotesBucket = new quotesBucket({
          page: page + 1,
          count: 1,
          quotes: [data],
        });
        await newQuotesBucket.save();

        await protectors.findOneAndUpdate(
          { admin: ADMIN },
          {
            maxPage: page + 1,
          }
        );

        return res.status(200).json({ maxPage: page + 1 });
      }

      return res.status(200).json({ maxPage: page });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, position: "create quotes" });
    }
  },
  updateQuote: async (req, res) => {
    try {
      const { page, id, data } = req.body;
      const quoteFound = await quotesBucket.findOneAndUpdate(
        { page, quotes: { $elemMatch: { _id: id } } },
        {
          $set: {
            "quotes.$.quote": data.quote,
            "quotes.$.author": data.author,
          },
        }
      );
      return res.status(200).json({ quoteFound });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, position: "update quote" });
    }
  },
  readQuotes: async (req, res) => {
    try {
      const { page: pageRequest } = req.body;

      if (pageRequest < 0) {
        return res
          .status(400)
          .json({ message: "page request must greater zero" });
      }

      if (!pageRequest) {
        const data = await protectors.findOne({ admin: ADMIN });
        const { maxPage } = data;

        if (maxPage === 0 || !maxPage) {
          return res.status(200).json({ quotes: [], page: 0 });
        }
        const quoteData = await quotesBucket.findOne({ page: maxPage });
        const { quotes, page } = quoteData;
        return res
          .status(200)
          .json({ quotes, page, maxPageFromServer: maxPage });
      }

      const quoteData = await quotesBucket.findOne({ page: pageRequest });

      const { quotes, page } = quoteData;

      return res.status(200).json({ quotes, page });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  readRandomQuotes: async (req, res) => {
    try {
      const { maxPage } = await protectors.findOne({ admin: ADMIN });
      const page = Math.floor(Math.random() * maxPage) + 1;
      const data = await quotesBucket.findOne({ page });
      if (data.count < 5) {
        const data = await quotesBucket.findOne({ page: page - 1 });
        return res.status(200).json({ quotes: data.quotes });
      }
      return res.status(200).json({ quotes: data.quotes });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteQuote: async (req, res) => {
    try {
      const { key } = req.params;

      const page = key.split("&")[0];
      const id = key.split("&")[1];

      if (!id || !page) {
        return res.status(400).json({ message: "Missed id or page" });
      }

      await quotesBucket.updateOne(
        { page, quotes: { $elemMatch: { _id: id } } },
        {
          $pull: { quotes: { _id: id } },
          $inc: { count: -1 },
        }
      );

      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = that;
