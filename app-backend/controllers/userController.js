const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const {uploadImage} = require("../services/imageService")
const {fromUpload, deleteFileDocument, findById} = require("../models/fileDocument");


exports.getById = async (req, res) => {
    try {
        let {id} = req.params;
        let user = await User.findById(id);
        if (!user) return res.status(404).json({message: 'User not found'});
        return res.json(user.details());
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
    uploadImage(req, res, async (err) => {
        const id = req.params.id;

        logger.info(id);
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({message: err.message});
        }



        let user = await User.findById(id);

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;

        if (req.file) {
            if (user.profileImageId) {
                const avatarFile = await findById(user.profileImageId);
                avatarFile.delete();

            }

            let file = fromUpload(
                req.file.filename,  req.file.filename, req.file.mimetype
            );

            await file.save();
            user.profileImageId = file.id;

        }


        await user.save();
        let alert = {
            type: "success",
            title: "Success!",
            body: "Profile updated successfully."
        }
        res.status(200).json({alert, 'user': user.details()});
    });
};
