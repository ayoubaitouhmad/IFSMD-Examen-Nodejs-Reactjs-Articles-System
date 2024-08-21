const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.getById = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        if (!user) return res.status(404).send('User not found'); // If user not found, return 404
        return res.json(user);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};
exports.getByUsername = async (req, res) => {
    try {
        let { username } = req.params;
        let user = await User.findByUsername(username);
        if (!user) return res.status(404).send('User not found');
        return res.json(user);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};

exports.getUserArticles = async (req, res) => {
    try {
        let { id } = req.params;
        let userArticles = await User.findUserArticles(id);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedArticles = userArticles.slice(startIndex, endIndex);


        logger.error(id)
        return res.json({
            startIndex,
            endIndex,
            totalPages: Math.ceil(userArticles.length / limit),
            totalPosts: userArticles.length,
            date: new Date(),
            articles : paginatedArticles
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};
