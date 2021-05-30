const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastName: String,
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema)

module.exports = { User }