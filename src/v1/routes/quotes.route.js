const express = require("express");
const router = express.Router();
const {
  quotesUpload,
  quotesList,
  quotesSearch,
  quotesRandom,
  deleteQuote,adminAccess
} = require("../controllers");

router.post("/", quotesUpload);

router.get("/", quotesList);

router.get("/random", quotesRandom);

router.get("/search?*", quotesSearch);

router.delete("/:id", deleteQuote);
router.delete("/admin", deleteQuote);

module.exports = router;
