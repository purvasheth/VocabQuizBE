const { Bookmarked } = require("./bookmarked-model");
const { sendError } = require("../utils");

async function fetchBookmarkedWords(res, userId) {
  try {
    const bookmarked = await Bookmarked.findOne({ userId }).populate("words");
    return bookmarked ? bookmarked.words : [];
  } catch (error) {
    return sendError(res, error.message, 502);
  }
}
async function bookmarkWord(res, wordId, userId) {
  try {
    let bookmarked = await Bookmarked.findOne({ userId });
    if (!bookmarked) {
      bookmarked = new Bookmarked({ userId, words: [wordId] });
    }
    bookmarked.words.push(wordId);
    await bookmarked.save();
    return { message: "success" };
  } catch (error) {
    return sendError(res, error.message);
  }
}
async function removeFromBookmarkedWords(res, wordId, userId) {
  try {
    let bookmarked = await Bookmarked.findOne({ userId });
    if (!bookmarked) {
      return sendError(res, "No words are bookmarked yet", 400);
    }
    bookmarked.words = bookmarked.words.filter((id) => id != wordId);
    await bookmarked.save();
    return { message: "success" };
  } catch (error) {
    return sendError(res, error.message);
  }
}

module.exports = {
  fetchBookmarkedWords,
  bookmarkWord,
  removeFromBookmarkedWords,
};
