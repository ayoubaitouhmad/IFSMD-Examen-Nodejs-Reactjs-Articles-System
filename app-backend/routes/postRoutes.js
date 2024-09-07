const express = require('express');
const router = express.Router();
const postController = require('../controllers/articleController');

// More specific routes first
router.get('/articles/latest', postController.latestPosts);
router.get('/articles/most-viewed-articles', postController.mostViewedArticles);

// Generic routes after specific routes
router.get('/articles', postController.getAllPosts);
router.post('/articles', postController.addArticle);
router.get('/articles/:id', postController.findPost);
router.put('/articles/:id', postController.updateArticle);
router.delete('/articles/:id', postController.deleteArticle);

router.get('/articles/:id/edit', postController.editPost);
router.post('/articles/:id/increment-views', postController.incrementViews);

module.exports = router;
