const express = require("express");
const router = express.Router();

router.use("/quotes", require("./quotes.route"));
router.use("/admin", require("./admin.route"));

router.post("*", (req, res) => {
  return res.status(404).json({ message: "not api" });
});

module.exports = router;
