const express = require("express");
const router = express.Router();
const {
  quotesUpload,
  quotesList,
  quotesSearch,
  quotesRandom,
} = require("../controllers");

router.post("/", quotesUpload);

router.get("/", quotesList);

router.get("/random", quotesRandom);

router.get("/search?*", quotesSearch);

module.exports = router;
