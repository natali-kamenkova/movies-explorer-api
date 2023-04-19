const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  name: { // имя movie, строка от 2 до 30 символов, обязательное поле
    type: String,
    required: [true, 'Поле "name" обязательно'],
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  link: { // ссылка на movie, строка, обязательно поле
    type: String,
    required: [true, 'Поле "link" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  owner: { // ссылка на модель автора movie, тип ObjectId, обязательное поле
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле обязательно'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
