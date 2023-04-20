const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const { auth } = require('../middlewares/auth');

router.use('/movies', auth, movieRouter);
router.use('/users', auth, userRouter);

router.use('/*', auth, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
