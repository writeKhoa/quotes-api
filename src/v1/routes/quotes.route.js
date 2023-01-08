const express = require("express");
const router = express.Router();
const { quoteController: controller } = require("../controllers");
const { verifyToken: middleware } = require("../middlewares");

//! create
router.post("/", middleware.verifyAccessToken, controller.createQuote);

//! update
router.put("/", middleware.verifyAccessToken, controller.updateQuote);

//! read
router.post("/list", controller.readQuotes);

//! delete
router.delete("/:key", middleware.verifyAccessToken, controller.deleteQuote);

// not middleware
router.get("/random", controller.readRandomQuotes);

module.exports = router;
