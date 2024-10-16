const logger = require("../utils/logger");
const ArticleCategoryCollection = require("../db/migrations/articleCategory");
const CategoryCollection = require("../db/migrations/categories");
const { ObjectId } = require("mongodb");
const MoCategoryModel = require("./MoCategoryModel");

class ArticleCategory {
    categoryId;
    articleId;

    static get COLLECTION_NAME() {
        return process.env.DB_ARTICLE_CATEGORY_COLLECTION_NAME;
    }

    constructor(categoryId, articleId) {
        this.categoryId = categoryId;
        this.articleId = articleId;
    }

    details() {
        return {
            categoryId: this.categoryId,
            articleId: this.articleId,
        };
    }

    static async find(articleId, categoryId) {
        try {
            const collection = await ArticleCategoryCollection.collection();
            const result = await collection.findOne({
                article_id: new ObjectId(articleId),
                category_id: new ObjectId(categoryId)
            });
            return result ? new ArticleCategory(result.category_id, result.article_id) : null;
        } catch (error) {
            logger.error(`Error finding article category: ${error.message}`);
            return null;
        }
    }

    static async findCategoriesByArticleId(articleId) {
        try {
            const articleCategoryCollection = await ArticleCategoryCollection.collection();
            const categoryCollection = await CategoryCollection.collection();
            const pipeline = [
                {
                    $match: { article_id: new ObjectId(articleId) }
                },
                {
                    $lookup: {
                        from: CategoryCollection.collectionName,
                        localField: "category_id",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        description: { $first: "$category.description" },
                        created_at: { $first: "$category.created_at" },
                        updated_at: { $first: "$category.updated_at" }
                    }
                },
                {
                    $sort: { name: 1 }
                }
            ];
            const results = await articleCategoryCollection.aggregate(pipeline).toArray();
            return results.map(category => (MoCategoryModel.fromDatabaseRecord(category)).details());
        } catch (error) {
            logger.error(`Error finding categories by article ID: ${error.message}`);
            return [];
        }
    }

    async save() {
        try {
            const collection = await ArticleCategoryCollection.collection();
            const document = {
                article_id: new ObjectId(this.articleId),
                category_id: new ObjectId(this.categoryId)
            };
            await collection.insertOne(document);
            return true;
        } catch (error) {
            logger.error(`Error saving article category: ${error.message}`);
            return false;
        }
    }
}

module.exports = ArticleCategory;