require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/db");
const errorHandler = require("./middleware/error-handler");
const routeNotFound = require("./middleware/route-not-found");
const verifyAuth = require("./middleware/verify-auth");
const wordsRouter = require("./words/words-router");
const authRouter = require("./users/auth-router");
const bookmarkedRouter = require("./bookmarked/bookmarked-router");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();
// initializeWordsCollection()

app.get("/", (req, res) => {
  res.send("APIs for Vocab Quiz");
});

app.use(authRouter);
app.use("/words", verifyAuth, wordsRouter);
app.use("/bookmarked", verifyAuth, bookmarkedRouter);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(process.env.PORT || port, () => {
  console.log(`Started server on ${port}!`);
});
