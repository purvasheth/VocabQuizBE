function sendError(res, message, statusCode = 500) {
  return res.status(statusCode).json({ message });
}

module.exports = { sendError };
