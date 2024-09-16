const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleredirectUrl,
  handleGetAllUrlData,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleredirectUrl);

module.exports = router;
