const user = require('express').Router();

const {
  createUser,
  findUsers,
  findUserById,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

user.post('/users', createUser);

user.get('/users', findUsers);

user.get('/users/:id', findUserById);

user.patch('/users/me', patchUser);

user.patch('/users/me/avatar', patchUserAvatar);

module.exports = user;
