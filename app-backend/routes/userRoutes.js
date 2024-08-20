const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/user', userController.findById);


module.exports = router;
