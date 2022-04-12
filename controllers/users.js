const User = require('../models/users');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Переданы некорректные данные при поиске пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при редактировании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
