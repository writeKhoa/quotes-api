require("dotenv").config("");
const { quotes } = require("../models");

const quotesUpload = async (req, res) => {
  try {
    const { username, password, quote, author } = req.body;

    // todo check and validate
    const errorBody = !username || !password || !quote || !author;
    if (errorBody) {
      return res.status(400).json({ message: "error at request" });
    }
    const matchUsernameAndPassword =
      username !== process.env.username && password !== process.env.password;
    if (matchUsernameAndPassword) {
      return res.status(400).json({ message: "username or password wrong" });
    }

    const isExistQuote = await quotes.findOne({ quote }).exec();
    if (isExistQuote) {
      return res.status(400).json({ message: "quote is existed" });
    }

    // todo save quote
    const newQuote = await quotes.create({ quote, author });
    await newQuote.save();

    return res.status(200).json({ message: "create quote successed" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const quotesList = async (req, res) => {
  try {
    const data = await quotes.find({}).select("author quote -_id").exec();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const quotesSearch = async (req, res) => {
  try {
    const { quote, author } = req.query;
    if (!quote && !author) {
      return res.status(500).json({ message: "query is wrong", quote, author });
    }
    let data;
    if (quote) {
      data = await quotes.find({}).select("author quote -_id").exec();
      data.map((obj) => {
        const { quote: quoteFromDB } = obj;
        if (quoteFromDB.includes(quote)) {
          return obj;
        }
      });
    } else if (author) {
      data = await quotes.find({ author }).select("author quote -_id").exec();
    } else {
      data = await quotes
        .find({ quote, author })
        .select("author quote -_id")
        .exec();
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const quotesRandom = async (req, res) => {
  try {
    const count = await quotes.count().exec();

    const random = Math.floor(Math.random() * count);

    const data = await quotes
      .findOne()
      .select("author quote -_id")
      .skip(random)
      .exec();

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "not id" });
    }
    await quotes.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "delete successed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  quotesUpload,
  quotesList,
  quotesSearch,
  quotesRandom,
  deleteQuote,
};
