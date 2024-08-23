const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users/id/:id', userController.getById);
router.get('/users/username/:username', userController.getByUsername);

router.get('/users/id/:id/articles', userController.getUserArticles);
router.post('/users/id/:id/profile/update', userController.updateProfile);

module.exports = router;
