const express = require("express");
const router = express.Router();
const { quoteController } = require("../controllers");

router.get("/", quoteController.adminAccess);

module.exports = router;
