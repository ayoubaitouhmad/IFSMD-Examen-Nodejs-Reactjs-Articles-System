const {latestPosts, mostViewedArticles, articles, findById} = require("../models/Article");


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


