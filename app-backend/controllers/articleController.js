const Article = require('../models/articleModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Article.posts();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.findPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Article.findById(id);
        await  post.fetchAuthor();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};



// exports.createPost = async (req, res) => {
//     const post = req.body;
//     try {
//         const result = await Post.create(post);
//         res.status(201).send(result);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };
//
// exports.updatePost = async (req, res) => {
//     const { id } = req.params;
//     const post = req.body;
//     try {
//         const result = await Post.update(id, post);
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };
//
// exports.deletePost = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await Post.delete(id);
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };
