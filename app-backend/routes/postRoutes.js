const express = require('express');
const router = express.Router();
const postController = require('../controllers/articleController');
const path = require("path");
const {IMAGES_UPLOAD_DUR} = require("../config/imageStorage");
const fs = require("fs");
const sharp = require("sharp");

router.get('/articles', postController.getAllPosts);
router.get('/articles/latest', postController.latestPosts);
router.get('/articles/most-viewed-articles', postController.mostViewedArticles);
router.get('/articles/:id', postController.findPost);
router.post('/articles/:id/update', postController.updateArticle);
router.post('/articles/:id/delete', postController.deleteArticle);
router.post('/articles/:id/increment-views', postController.incrementViews );
router.post('/articles/add', postController.addArticle);

module.exports = router;
