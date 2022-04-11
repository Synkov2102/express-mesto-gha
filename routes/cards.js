const cards = require('express').Router();

const {
  createCard,
  findCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.post('/cards', createCard);

cards.get('/cards', findCards);

cards.delete('/cards/:cardId', deleteCardById);

cards.put('/cards/:cardId/likes', likeCard);

cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cards;
