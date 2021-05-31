const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env["uri"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to db successfully");
  } catch (error) {
    console.log("failed to connect to db");
    console.log(error);
  }
}

module.exports = { connectDB };
