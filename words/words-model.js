const mongoose = require("mongoose");
const { words } = require("./data");

const detailSchema = new mongoose.Schema({
  type: { type: String, required: true },
  meaning: { type: String, required: true },
  sentence: { type: String, required: true },
});

const mcqSchema = new mongoose.Schema({
  options: [{ type: String }],
  answer: { type: Number, required: true },
});

const wordSchema = new mongoose.Schema({
  word: String,
  mcq: mcqSchema,
  details: [{ type: detailSchema }],
});
const Word = mongoose.model("Word", wordSchema);

function initializeWordsCollection() {
  try {
    words.forEach(async (word) => {
      const newWord = new Word(word);
      const savedWord = await newWord.save();
      console.log(savedWord);
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { Word, initializeWordsCollection };
