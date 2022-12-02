const express = require("express");
const router = express.Router();
const {
  quoteController
} = require("../controllers");

router.post("/", quoteController.quotesUpload);

router.get("/", quoteController.quotesList);

router.get("/random", quoteController.quotesRandom);

router.get("/search?*", quoteController.quotesSearch);

router.delete("/:id", quoteController.deleteQuote);

module.exports = router;
