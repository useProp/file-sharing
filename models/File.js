const { model, Schema } = require('mongoose');

const File = new Schema({
  path: { type: String, required: true, },
  originalName: { type: String, required: true, },
  downloadCount: { type: Number, default: 0, required: true, },
  password: { type: String, },
});

module.exports = model('File', File);
