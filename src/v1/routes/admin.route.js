const express = require("express");
const router = express.Router();
const { adminController: controller } = require("../controllers");
const { verifyToken: middlewares } = require("../middlewares");

router.post("/login", controller.login);

router.post("/relogin", middlewares.verifyRefreshToken, controller.relogin);

router.post(
  "/newAccessToken",
  middlewares.verifyRefreshToken,
  controller.refreshAccessToken
);

router.post("/logout", middlewares.verifyRefreshToken, controller.logout);

module.exports = router;
