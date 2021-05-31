const express = require("express");
const { fetchWords, getCount } = require("./words-controller");

const router = express.Router();

router.get("/", async (req, res) => {
  const options = req.query;
  const words = await fetchWords(res, options);
  res.status(200).json({ words, ...options });
});

router.get("/count", async (req, res) => {
  const count = await getCount(res);
  res.status(200).json({ count });
});

module.exports = router;
