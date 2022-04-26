const jwt = require('jsonwebtoken');

const avtorizationErr = new Error('Необходима авторизация');
avtorizationErr.statusCode = 401;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(avtorizationErr);
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(avtorizationErr);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
