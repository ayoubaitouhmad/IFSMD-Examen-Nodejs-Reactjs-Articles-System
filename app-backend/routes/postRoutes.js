const express = require('express');
const router = express.Router();
const postController = require('../controllers/articleController');

router.get('/articles', postController.getAllPosts);
router.get('/articles/:id', postController.findPost);
// router.post('/posts', postController.createPost);
// router.put('/posts/:id', postController.updatePost);
// router.delete('/posts/:id', postController.deletePost);

module.exports = router;
