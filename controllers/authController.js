const jwt = require('jsonwebtoken');

// Функция: создание токена
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Функция: отправка токена
const sendToken = res => {
  const token = signToken(process.env.API_PASSWORD);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    status: 'success',
    token
  });
};

// Функция: логин пользователь
exports.login = (req, res) => {
  const { login, password } = req.body;

  // 1) Проверка логина и пароля
  if (
    login !== process.env.API_LOGIN ||
    password !== process.env.API_PASSWORD
  ) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid password or login'
    });
  }

  // 2) Если всё ОК - отправить токен
  sendToken(res);
};

// Функция: защита API через bearer token
exports.protectAPI = (req, res, next) => {
  //Функция: отправка ошибки прав доступа к API
  const resAccessFail = resObj => {
    resObj.status(404).json({
      status: 'fail',
      message: 'You dont`t have an access to this API'
    });
  };

  // 1) Проверка, пришёл ли token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return resAccessFail(res);
  }

  // 2) Проверка токена на подлинность
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded.id === process.env.API_PASSWORD) {
      //если всё ОК, то next()
      next();
    } else {
      return resAccessFail(res);
    }
  });
};
