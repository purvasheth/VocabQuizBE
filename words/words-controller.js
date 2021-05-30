const { Word } = require("./words-model");
const { sendError } = require("../utils");

async function fetchWords(res, { size, page }) {
  try {
    const words =
      (await size) && page
        ? Word.find()
            .skip(page * size)
            .limit(+size)
        : Word.find();
    return words;
  } catch (error) {
    return sendError(res, error.message, 502);
  }
}

async function getCount(res) {
  try {
    const count = await Word.count();
    return count;
  } catch (error) {
    return sendError(res, error.message, 502);
  }
}

module.exports = { fetchWords, getCount };
