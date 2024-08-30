const {latestPosts, mostViewedArticles, articles, findById} = require("../models/Article");
const {uploadImage} = require("../services/imageService");
const logger = require("../utils/logger");
const User = require("../models/userModel");
const Article = require("../models/Article");
const FileDocument = require("../models/fileDocument");
const {fromUpload} = require("../models/fileDocument");


exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const date = req.query.date || null;
        const search = req.query.search || null;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const author = req.query.author || null;
        let posts = await articles();


        posts = posts.filter(post =>
            (date != null ? new Date(post.createdAt) >= new Date(date) : true) &&
            (
                (search != null ? post.title.toLowerCase().includes(search.toLowerCase()) : true) ||
                (search != null ? post.content.toLowerCase().includes(search.toLowerCase()) : true)
            )
        );


        const paginatedPosts = posts.slice(startIndex, endIndex);


        res.json({
            page,
            startIndex,
            endIndex,
            totalPages: Math.ceil(posts.length / limit),
            totalPosts: posts.length,
            filters: {date, search},
            posts: paginatedPosts,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.findPost = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const post = await findById(id);
        res.json(post.details());
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.latestPosts = async (req, res) => {
    try {
        const posts = await Article.latestPosts();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.latestPosts = async (req, res) => {
    try {
        const posts = await latestPosts();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.mostViewedArticles = async (req, res) => {
    try {
        const posts = await mostViewedArticles();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.deleteArticle = async (req, res) => {
    try {
        const {id} = req.params;
        const articleModel = await findById(id);
        await articleModel.delete();
        res.json(articleModel.details());
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.updateArticle = async (req, res) => {
    uploadImage(req, res, async (err) => {

        const id = req.params.id;
        const userId = req.user.id;


        let articleModel = await Article.findById(id);
        logger.info('articleModel.id')

        if (articleModel.authorId != userId) {
            res.status(404).json({message: 'Post not found'});
        }


        articleModel.title = req.body.title || articleModel.title;
        articleModel.description = req.body.description || articleModel.description;
        articleModel.content = req.body.content || articleModel.content;

        if (req.file) {
            if (articleModel.articleImageId) {
                const avatarFile = await findById(articleModel.articleImageId);
                if (avatarFile) {
                    avatarFile.delete();
                }
            }

            let file = fromUpload(
                req.file.filename, req.file.filename, req.file.mimetype
            );

            await file.save();
            articleModel.articleImageId = file.id;

        }


        await articleModel.save();
        let alert = {
            type: "success",
            title: "Success!",
            body: "Profile updated successfully."
        }
        res.status(200).json({alert, articleModel});

    });
};
exports.addArticle = async (req, res) => {

    uploadImage(req, res, async (err) => {
        const articleModel = Article.fromAddArticle(
            req.body.title,
            req.body.description,
            req.body.content,
            req.user.id,
        );
        if (req.file) {
            let file = fromUpload(
                req.file.filename, req.file.filename, req.file.mimetype
            );
            await file.save();
            articleModel.articleImageId = file.id;
        }
        await articleModel.save();
        let alert = {
            type: "success",
            title: "Success!",
            body: "Profile updated successfully."
        }
        res.status(200).json(articleModel.details());

    });
};

exports.incrementViews = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const post = await findById(id);
        post.views++;
        await post.save();
        res.json(post.details());

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};


