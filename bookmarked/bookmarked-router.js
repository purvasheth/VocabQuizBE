const express = require("express");
const {
  fetchBookmarkedWords,
  bookmarkWord,
  removeFromBookmarkedWords,
} = require("./bookmarked-controller");
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user._id;
  const words = await fetchBookmarkedWords(res, userId);
  res.status(200).json({ words });
});

router
  .route("/:wordId")
  .post(async (req, res) => {
    const userId = req.user._id;
    const { wordId } = req.params;
    const successResponse = await bookmarkWord(res, wordId, userId);
    res.status(201).json(successResponse);
  })
  .delete(async (req, res) => {
    const userId = req.user._id;
    const { wordId } = req.params;
    const successResponse = await removeFromBookmarkedWords(
      res,
      wordId,
      userId
    );
    res.status(204).json({});
  });

module.exports = router;
