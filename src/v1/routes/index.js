const express = require("express");
const { route } = require("./quotes.route");
const router = express.Router();

router.use("/quotes", require("./quotes.route"));

router.post("*", (req, res) => {
  return res.status(404).json({ message: "not api" });
});

module.exports = router;
