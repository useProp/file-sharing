const bcrypt = require('bcrypt');
const File = require("../models/File");
const ApiError = require('../error/api.error');

class UploadController {
  async upload(req, res, next) {
    try {
      const { originalname, path } = req.file;
      const { password } = req.body;
      const fileFields = { originalName: originalname, path };
      if (password) {
        fileFields.password = await bcrypt.hash(password, 5);
      }

      const file = await File.create(fileFields);

      res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  getForm(req, res) {
    res.render('index');
  }
}

module.exports = new UploadController();
