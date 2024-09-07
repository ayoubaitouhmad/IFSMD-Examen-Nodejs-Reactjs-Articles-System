const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users/:id', userController.getById);
router.get('/user/username/:username', userController.getByUsername);
router.get('/user/:id/articles', userController.getUserArticles);
router.post('/user/:id/profile/update', userController.updateProfile);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);

module.exports = router;
