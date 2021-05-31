const jwt = require("jsonwebtoken");
const { User } = require("../users/users-model");
const { findUserById } = require("../users/users-controller");

async function verifyAuth(req, res, next) {
  const token = req.header("token");
  if (!token) {
    res.status(401).json({ message: "Un-authenticated Request" });
  }
  const { userId } = jwt.verify(token, process.env["secret"]);
  const user = await findUserById(res, userId);
  if (user) {
    req.user = user;
    return next();
  }
  res.status(401).json({ message: "Un-authenticated Request" });
}

module.exports = verifyAuth;
