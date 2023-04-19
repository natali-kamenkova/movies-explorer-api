const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound'); // 404
const BadRequest = require('../errors/BadRequest'); // 400
const NotAllowedError = require('../errors/NotAllowedError'); // 403

// создание movie
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: ownerId,
  })
    .then((movie) => Movie.populate(movie, 'owner'))
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// получение всех movies
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next); // создаст 500
};

// удаление movie
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFound('Movie с таким _id не найден'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new NotAllowedError('У данного пользователя нет прав для удаления данной movie!');
      } else {
        return movie.remove()
          .then(() => res.send({ message: 'Movie успешно удален' }));
      }
    })
    .catch(next); // создаст 500
};
