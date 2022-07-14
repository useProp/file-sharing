const bcrypt = require('bcrypt');
const File = require('../models/File');
const ApiError = require('../error/api.error');

module.exports = async (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      next();
    }

    const { password } = req.body;
    if (!password) {
      return res.render('password', { error: 'Password is required' });
    }

    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
      return next(ApiError.notFound('File not found'));
    }

    if (!file.password) {
      return next();
    }

    const isPasswordCorrect = await bcrypt.compare(password, file.password);
    if (!isPasswordCorrect) {
      return res.render('password', { error: 'Password is incorrect' })
    }

    next();
  } catch (e) {
    next(ApiError.internal(e.message));
  }

}
