const user = require('express').Router();

const {
  findUsers,
  findUserById,
  findCurrentUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

user.get('/users', findUsers);

user.get('/users/me', findCurrentUser);

user.get('/users/:id', findUserById);

user.patch('/users/me', patchUser);

user.patch('/users/me/avatar', patchUserAvatar);

module.exports = user;
