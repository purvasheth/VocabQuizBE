const bcrypt = require("bcryptjs");
const { User } = require("./users-model");
const { sendError } = require("../utils");

async function findUserByEmail(res, email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return sendError(res, error.message);
  }
}

async function findUserById(res, id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return sendError(res, error.message);
  }
}

async function saveNewUser(res, { password, email, lastName, firstName }) {
  if (!password) {
    res.status(400).json({ message: "password is required" });
  }
  try {
    const newUser = new User({
      email,
      password,
      lastName,
      firstName,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return sendError(res, error.message);
  }
}

async function updatePassword(res, user, password) {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    return user.save();
  } catch (error) {
    return sendError(res, error.message);
  }
}

module.exports = { findUserByEmail, saveNewUser, updatePassword, findUserById };
