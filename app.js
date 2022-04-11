const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

const user = require('./routes/users');
const card = require('./routes/cards');

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6253dd4461d66e3ba17e2be1', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', user);
app.use('/', card);

app.listen(PORT);