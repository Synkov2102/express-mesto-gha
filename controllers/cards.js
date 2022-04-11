const Card = require('../models/cards');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) { return res.status(404).send({ message: 'Карточка с указанным _id не найдена' }); }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) { return res.status(404).send({ message: 'Карточка с указанным _id не найдена' }); }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) { return res.status(404).send({ message: 'Карточка с указанным _id не найдена' }); }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
