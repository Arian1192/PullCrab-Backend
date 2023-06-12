const errorHandler = (err, req, res, next) => {
  res.status(404).json({
    code: err.code,
    status: err.status,
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
