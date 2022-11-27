const express = require("express");
const router = express.Router();
const { adminAccess } = require("../controllers");

router.get("/", adminAccess);

module.exports = router;
