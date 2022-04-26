const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const userErr = new Error('Неправильная почта или пароль');
userErr.statusCode = 401;

const notFoundErr = new Error('Пользователь не найден');
notFoundErr.statusCode = 404;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) { throw notFoundErr; }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.findCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw notFoundErr; }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw notFoundErr; }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw notFoundErr; }
      return res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        Promise.reject(userErr);
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(userErr);
          }

          // аутентификация успешна
          return res
            .status(200)
            .cookie('jwt', token, {
              // token - наш JWT токен, который мы отправляем
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .send({ message: 'ОК' });
        });
    })
    .catch((err) => next(err));
};
