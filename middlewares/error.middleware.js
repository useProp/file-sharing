const ApiError = require("../error/api.error");

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal server error' })
}
