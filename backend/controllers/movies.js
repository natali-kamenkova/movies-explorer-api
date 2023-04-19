const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound'); // 404
const BadRequest = require('../errors/BadRequest'); // 400
const NotAllowedError = require('../errors/NotAllowedError'); // 403

// создание movie
module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Movie.create({ name, link, owner: ownerId })
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

// получение всех movie
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'likes'])
    .then((movie) => res.send(movie))
    .catch(next); // создаст 500
};

// удаление movie
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFound('Карточка с таким _id не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        throw new NotAllowedError('У данного пользователя нет прав для удаления данной movie!');
      } else {
        return movie.remove()
          .then(() => res.send({ message: 'Карточка успешно удалена' }));
      }
    })
    .catch(next); // создаст 500
};
