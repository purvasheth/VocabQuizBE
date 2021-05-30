function errorHandler(err, req, res, next) {
  console.log(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
}

module.exports = errorHandler;
