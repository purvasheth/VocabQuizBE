const mongoose = require("mongoose");

const bookmarkedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  words: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }],
});

const Bookmarked = mongoose.model("Bookmarked", bookmarkedSchema);

module.exports = { Bookmarked };
