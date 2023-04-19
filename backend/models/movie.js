const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму
    type: String,
    required: [true, 'Поле "image" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  trailerLink: { //  ссылка на трейлер фильма
    type: String,
    required: [true, 'Поле "trailerLink" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  thumbnail: { //  миниатюрное изображение постера к фильму
    type: String,
    required: [true, 'Поле "thumbnail" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  owner: { // _id пользователя, который сохранил фильм. Обязательное поле
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском языке. Обязательное поле-строка
    type: String,
    required: true,
  },
  nameEN: { // название фильма на английском языке. Обязательное поле-строка
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
