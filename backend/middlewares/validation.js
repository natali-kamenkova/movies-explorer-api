const { celebrate, Joi } = require('celebrate');

const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/BadRequest'); // 400
// валидания ссылок
const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateUser = celebrate({ // POST /signup — создаёт пользователя
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateMovie = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/http[s]?:\/\/(?:www\.)?([\w-]+\.)+\/?\S*$/),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({
    MovieId: Joi.string().hex().length(24),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});
