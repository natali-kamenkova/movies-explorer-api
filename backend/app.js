require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const handlerErrors = require('./middlewares/handlerErrors');
const { handlerRequestLogger, handlerErrorLogger } = require('./middlewares/logger');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');
const { corsFunction } = require('./middlewares/corsSettings');
const { limiter } = require('./middlewares/limiterSettings');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

async function connect() {
  try {
    await mongoose.set('strictQuery', false);
    console.log(`connecting to ${MONGO_URL}`);
    await mongoose.connect(MONGO_URL);
    console.log(`server connect to ${MONGO_URL}`);
    await app.listen(PORT);
    console.log(`server listen port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

app.use(cors(corsFunction));
app.use(express.json());
app.use(helmet());
app.use(handlerRequestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(router);
app.use(handlerErrorLogger);
app.use(errors());
app.use(handlerErrors);
connect();
