const {
  quotesUpload,
  quotesList,
  quotesSearch,
  quotesRandom,
  deleteQuote,
  adminAccess,
} = require("./quotes.controllers");

module.exports = {
  quotesUpload,
  adminAccess,
  quotesList,
  quotesSearch,
  quotesRandom,
  deleteQuote,
};
