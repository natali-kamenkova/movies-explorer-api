const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" обязательно'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Ссылка должна быть валидной',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
