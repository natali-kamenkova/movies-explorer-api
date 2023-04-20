const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');

router.use('/movies', auth, movieRouter);
router.use('/users', auth, userRouter);

router.use('/*', auth, (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
