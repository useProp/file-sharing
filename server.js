require('dotenv/config');
const express = require('express');
const multer = require('multer');
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File = require('./models/File');

const app = express();
const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const { password } = req.body;
  const fileFields = { originalName: originalname, path };
  if (password) {
    fileFields.password = await bcrypt.hash(password, 5);
  }
  const file = await File.create(fileFields);

  res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.get('/file/:id', handleRequest);
app.post('/file/:id', handleRequest);

async function handleRequest(req, res, next) {
  const file = await File.findById(req.params.id);

  if (!file.password) {
    file.downloadCount++;
    await file.save();
    return res.download(file.path, file.originalName);
  }

  const { password } = req.body;
  if (!password) {
    return res.render('password');
  }

  const isPasswordCorrect = await bcrypt.compare(password, file.password);
  if (!isPasswordCorrect) {
    return res.render('password', { error: 'Password is incorrect' })
  }

  file.downloadCount++;
  await file.save();
  res.download(file.path, file.originalName);
}

const bootstrap = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.APP_PORT, () => console.log(`Server is running...`));
  } catch (e) {
    process.exit(1);
  }
}

bootstrap()
