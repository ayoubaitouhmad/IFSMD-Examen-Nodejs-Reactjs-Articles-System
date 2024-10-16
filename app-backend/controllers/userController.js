const User = require("../models/userModel");
const Article = require("../models/Article");
const logger = require('../utils/logger');
const {uploadImage} = require("../services/imageService");
const {fromUpload, findById} = require("../models/fileDocument");

/**
 * Get user details by ID.
 */
exports.getById = async (req, res) => {
    try {
        let {id} = req.params;
        let user = await User.findById(id);
        if (!user) return res.status(404).json({message: 'User not found'});
        console.log(user)
        return res.json(user.details());
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};

/**
 * Get user details by username.
 */
exports.getByUsername = async (req, res) => {
    try {
        let {username} = req.params;
        let user = await User.findByUsername(username);
        if (!user) return res.status(404).json({message: 'User not found'});
        return res.json(user.details());
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};

/**
 * Get all articles by a specific user, with pagination.
 */
exports.getUserArticles = async (req, res) => {
    try {
        let {id} = req.params;

        let userArticles = await Article.findUserArticles(id);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalViews = userArticles.reduce((sum, article) => sum + article.views, 0);
        const paginatedArticles = userArticles.slice(startIndex, endIndex);

        logger.info(`User ${id} fetched their articles`);

        return res.json({
            startIndex,
            endIndex,
            totalViews,
            totalPages: Math.ceil(userArticles.length / limit),
            totalPosts: userArticles.length,
            date: new Date(),
            articles: paginatedArticles
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};

/**
 * Update user profile details, including optional profile image update.
 */
exports.updateProfile = async (req, res) => {
    uploadImage(req, res, async (err) => {
        try {
            const id = req.params.id;

            logger.info(`Updating profile for user ${id}`);

            if (err) {
                logger.error('Multer error:', err);
                return res.status(400).json({message: err.message});
            }

            let user = await User.findById(id);

            // Update user details
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.bio = req.body.bio || user.bio;

            // Handle profile image update
            if (req.file) {
                if (user.profileImageId) {
                    const avatarFile = await findById(user.profileImageId);
                    if (avatarFile) {
                        await avatarFile.delete();
                    }
                }

                let file = fromUpload(
                    req.file.filename, req.file.filename, req.file.mimetype
                );
                await file.save();
                user.profileImageId = file.id;
            }

            await user.save();
            let alert = {
                type: "success",
                title: "Success!",
                body: "Profile updated successfully."
            };
            return res.status(200).json({alert, 'user': user.details()});
        } catch (err) {
            logger.error(err.message);
            return res.status(500).send('Server error');
        }
    });
};

/**
 * Get user details by username.
 */
exports.forgotPassword = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found'});
        await user.sendResetPasswordEmail();
        let alert = {
            type: "success",
            title: "Success!",
            body: "Password Reset Email Has Been Sent"
        };
        return res.status(200).json({alert});
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};

/**
 * Get user details by username.
 */
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId);
        const {newPassword, oldPassword} = req.body;

        if (user == null) {
            return res.status(404).json({message: 'User not found'})
        }
        if (user.password != oldPassword) {
            return res.status(404).json({message: 'wrong password'})
        }
        user.password = newPassword;
        await user.save();

        let alert = {
            type: "success",
            title: "Success!",
            body: "Password Changed Successfully"
        };
        res.status(200).json({alert});
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};