const express = require('express');
const userRouter = require('express').Router();
const { validationUpdateProfile } = require('../middlewares/validation');

const {
  updateProfile,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', express.json(), validationUpdateProfile, updateProfile); // PATCH /users/me — обновляет профиль

module.exports = userRouter;
