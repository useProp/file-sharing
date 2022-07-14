const File = require("../models/File");
const ApiError = require("../error/api.error");

class FileController {
  async download(req, res, next) {
    try {
      const file = await File.findById(req.params.id);
      if (!file) {
        return next(ApiError.notFound('File not found'));
      }

      file.downloadCount++;
      await file.save();
      res.download(file.path, file.originalName);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new FileController();
