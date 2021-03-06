const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');

const app = express();

const URLErr = new Error('Неправильный формат ссылки');
URLErr.statusCode = 401;

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw URLErr;
  }
  return value;
};

const { PORT = 3000 } = process.env;
const pageNotFound = new Error('Страница не найдена');
pageNotFound.statusCode = 404;

const {
  createUser,
  login,

} = require('./controllers/users');

const user = require('./routes/users');
const card = require('./routes/cards');
const auth = require('./middlewares/auth');

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use(express.json());
app.use(cookieParser());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.custom(validateURL),
  }),
}), createUser);
app.use(auth);
app.use('/', user);
app.use('/', card);
app.use('/', (req, res, next) => {
  next(pageNotFound);
});
app.use(errors());
app.use((err, req, res, next) => {
  next();
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? err.message
        : message,
    });
});

app.listen(PORT);
