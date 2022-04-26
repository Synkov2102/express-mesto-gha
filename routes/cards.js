const cards = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  findCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.post('/cards', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  }),
}), createCard);

cards.get('/cards', findCards);

cards.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCardById);

cards.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

cards.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cards;
