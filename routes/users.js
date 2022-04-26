const user = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findUsers,
  findUserById,
  findCurrentUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

user.get('/users', findUsers);

user.get('/users/me', findCurrentUser);

user.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), findUserById);

user.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

user.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), patchUserAvatar);

module.exports = user;
