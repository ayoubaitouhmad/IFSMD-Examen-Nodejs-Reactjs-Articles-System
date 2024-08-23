const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const {uploadImage} =require("../services/imageService")

exports.getById = async (req, res) => {
    try {
        let {id} = req.params;
        let user = await User.findById(id);
        if (!user) return res.status(404).json({message: 'User not found'});
        return res.json(user);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};
exports.getByUsername = async (req, res) => {
    try {
        let {username} = req.params;
        let user = await User.findByUsername(username);
        if (!user) return res.status(404).json({message: 'User not found'});
        return res.json(user);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};

exports.getUserArticles = async (req, res) => {

    try {
        let {id} = req.params;
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
            articles: paginatedArticles
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};

exports.updateProfile = async (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: err.message });
        }

        if (!req.file) {
            console.error('File not uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Access file info and form fields
        console.log('File:', req.file);
        console.log('Name:', req.body.name);
        console.log('Email:', req.body.email);
        console.log('Bio:', req.body.bio);

        res.status(200).json({
            message: 'File uploaded successfully',
            imageUrl: `/uploads/${req.file.filename}`,
        });
    });
};
