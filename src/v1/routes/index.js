const express = require("express");
const router = express.Router();

router.use("/quotes", require("./quotes.route"));
router.use("/admin", require("./admin.route"));

module.exports = router;
