const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users/id/:id', userController.getById);
router.get('/users/username/:username', userController.getByUsername);
router.get('/users/id/:id/articles', userController.getUserArticles);

router.put('/users/id/:id/profile/update', userController.updateProfile);

router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);

module.exports = router;
