// const express = require('express');
const movieRouter = require('express').Router();
const { validationCreateMovie, validationMovieId } = require('../middlewares/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validationCreateMovie, createMovie);
movieRouter.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = movieRouter;
