const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // схема пользователя
  name: { // имя пользователя, строка от 2 до 30 символов, обязательное поле
    type: String,
    required: false,
    minlength: 2,
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  email: { // почта пользователя, уникальное значение
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Почта должна быть валидной!',
    },
  },
  password: { // пароль пользователя для входа
    type: String,
    required: true,
    select: false, // хеш пароля пользователя не будет возвращаться из базы
  },
});

module.exports = mongoose.model('user', userSchema);
