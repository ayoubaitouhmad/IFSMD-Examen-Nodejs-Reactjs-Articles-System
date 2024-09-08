const logger = require('../utils/logger');
const Category = require('../models/categoryModel');
const Article = require('../models/Article');

/**
 * Get all Categories
 */
exports.getAll = async (req, res) => {
    try {

        let withArticlesCount = req.query.withArticlesCount;
        if (withArticlesCount) {
            return res.json(await Category.allWithArticlesCount());
        }
        return res.json(await Category.all());
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};
/**
 * Get  specific article  categories
 */
exports.getCategoryArticles = async (req, res) => {
    try {
        const id = req.params.id;
        let articles = await Article.findCategoryArticles(id);
        let category = await Category.findById(id);

        if (category == null) {
            let alert = {
                type: "error",
                title: "category not found!",
                body: "category not found!"
            }
            return res.status(404).json({alert});
        }

        res.json({
            ... category.details(),
            articles
        });
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error');
    }
};

