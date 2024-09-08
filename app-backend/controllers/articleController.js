const {uploadImage} = require("../services/imageService");
const Article = require("../models/Article");
const {fromUpload} = require("../models/fileDocument");
const ArticleCategory = require('../models/articleCategory');


/**
 * Get all articles with pagination, filtering by date and search term.
 */
exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const date = req.query.date || null;
        const search = req.query.search || null;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const author = req.query.author || null;
        let posts = await Article.articles();
        // Filter posts by date and search term
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
/**
 * Find a post by its ID and return its details.
 */
exports.findPost = async (req, res) => {
    try {
        const {id} = req.params;
        const post = await Article.findById(id);
        // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // await sleep(3000);
        if (post == null) {
            let alert = {
                type: "error",
                title: "Post not found!",
                body: "Post not found!"
            }
            return res.status(404).json({alert});
        }
        res.json(post.details());
    } catch (err) {
        res.status(500).send(err);
    }
};
/**
 * Find a post by its ID and return its details if connected author own article.
 */
exports.editPost = async (req, res) => {
    try {

        const {id} = req.params;
        const userId = req.user.id;
        const post = await Article.findById(id);
        if (post == null) {
            let alert = {
                type: "error",
                title: "Post not found!",
                body: "Post not found!"
            }
            return res.status(404).json({alert});
        }

        if (post.authorId != userId) {
            return res.status(401).json({message: 'Post not found'});
        }
        res.json(post.details());
    } catch (err) {

        res.status(500).send(err);
    }
};
/**
 * Get latest articles
 */
exports.latestPosts = async (req, res) => {
    try {
        const posts = await Article.latestPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
};
/**
 * Get the most viewed articles.
 */
exports.mostViewedArticles = async (req, res) => {
    try {
        const posts = await Article.mostViewedArticles();
        res.json(posts);
    } catch (err) {

        res.status(500).send(err);
    }
};
/**
 * Delete Article if author own article
 */
exports.deleteArticle = async (req, res) => {
    try {
        const {id} = req.params;
        const articleModel = await Article.findById(id);
        if (articleModel == null) {
            let alert = {
                type: "error",
                title: "Post not found!",
                body: "Post not found!"
            }
            return res.status(404).json({alert});
        }


        const userId = req.user.id;
        if (articleModel.authorId !== userId) {
            return res.status(401).json({message: 'Post not found'});
        }
        await articleModel.delete();
        res.json(articleModel.details());
    } catch (err) {

        res.status(500).send(err);
    }
};
/**
 * Update Article  if author own article
 */
exports.updateArticle = async (req, res) => {
    uploadImage(req, res, async (err) => {

        const id = req.params.id;
        const userId = req.user.id;


        let articleModel = await Article.findById(id);

        if (articleModel == null) {
            let alert = {
                type: "error",
                title: "Post not found!",
                body: "Post not found!"
            }
            return res.status(404).json({alert});
        }

        // Ensure the user is the author of the article
        if (articleModel.authorId != userId) {
            return res.status(401).json({message: 'Post not found'});
        }

        // update the updatable columns if exists
        articleModel.title = req.body.title || articleModel.title;
        articleModel.description = req.body.description || articleModel.description;
        articleModel.content = req.body.content || articleModel.content;

        // Handle image upload and replacement
        if (req.file) {
            // if article already has image
            if (articleModel.articleImageId) {
                const avatarFile = await findById(articleModel.articleImageId);
                // delete the old image
                if (avatarFile) {
                    avatarFile.delete();
                }
            }
            // Handle the creating of new image.file represent image cause image a file
            let file = fromUpload(
                req.file.filename, req.file.filename, req.file.mimetype
            );
            await file.save();
            articleModel.articleImageId = file.id;
        }


        // Update article categories
        for (const category_id of JSON.parse(req.body.categories)) {
            // IDEA: instead of running one query plus for each category we can drop all records and them again
            if (!await ArticleCategory.find(id, category_id)) {
                const articleCategoryModel = new ArticleCategory(category_id, id);
                await articleCategoryModel.save();
            }
        }


        await articleModel.save();
        let alert = {
            type: "success",
            title: "Success!",
            body: "Profile updated successfully."
        }
        return res.status(200).json({alert, articleModel});

    });
};

/**
 * Add a new article
 */
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
        for (const category_id of JSON.parse(req.body.categories)) {
            const articleCategoryModel = new ArticleCategory(category_id, articleModel.id);
            await articleCategoryModel.save();
        }
        let alert = {
            type: "success",
            title: "Success!",
            body: "Profile updated successfully."
        }
        res.status(200).json(articleModel.details());

    });
};
/**
 * Increment the view count
 */
exports.incrementViews = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const post = await Article.findById(id);
        if (post == null) {
            let alert = {
                type: "error",
                title: "Post not found!",
                body: "Post not found!"
            }
            return res.status(404).json({alert});
        }
        post.views++;
        await post.save();
        res.json(post.details());

    } catch (err) {

        res.status(500).send(err);
    }

};


