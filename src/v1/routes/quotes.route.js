const express = require("express");
const router = express.Router();
const {
  quotesUpload,
  quotesList,
  quotesSearch,
  quotesRandom,
  deleteQuote,
} = require("../controllers");

router.post("/", quotesUpload);

router.get("/", quotesList);

router.get("/random", quotesRandom);

router.get("/search?*", quotesSearch);

router.delete("/:id", deleteQuote);

module.exports = router;
