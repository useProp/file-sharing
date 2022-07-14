require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error.middleware');
const indexRouter = require('./routers/index');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, }));

app.use('/', indexRouter);
app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.APP_PORT, () => console.log(`Server is running...`));
  } catch (e) {
    process.exit(1);
  }
}

bootstrap()
