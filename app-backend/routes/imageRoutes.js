const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');


router.get('/image/:name', imageController.streamImage);


module.exports = router;

