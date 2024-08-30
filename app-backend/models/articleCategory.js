const getConnection = require("../config/db");
const {IMAGE_PLACEHOLDER_280x187} = require("../services/imageService");
const logger = require("../utils/logger");

class ArticleCategory {

    categoryId;
    articleId;


    constructor(categoryId, articleId) {
        this.categoryId = categoryId;
        this.articleId = articleId;
    }

    details() {
        return {
            categoryId : this.categoryId,
            articleId : this.articleId,
        };
    }

    static async find(articleId,categoryId) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(
                `SELECT * FROM article_category WHERE article_id=? and category_id=?`,
                [ articleId, categoryId]
            );
            await connection.end();
            if (results.length === 0) {
                return null;
            }


            return new ArticleCategory(results[0].category_id,results[0].article_id);

        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }

    async save() {
        try {
            const connection = await getConnection();
            const query = `
                    INSERT INTO article_category (
                        article_id,category_id
                    )
                    VALUES (?, ?)
                `;
            const [result] = await connection.execute(query, [
                this.articleId,
                this.categoryId
            ]);
            await connection.end();
            return true;

        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }
}

module.exports = ArticleCategory;
