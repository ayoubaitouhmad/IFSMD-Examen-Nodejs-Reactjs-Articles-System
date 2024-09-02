const getConnection = require("../config/db");
const logger = require("../utils/logger");
const Category = require("./categoryModel"); // error
class ArticleCategory {

    categoryId;
    articleId;


    static get TABLE_NAME() {
        return process.env.DB_ARTICLE_CATEGORY_TABLE_NAME;
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
            const connection = await getConnection();
            const [results] = await connection.execute(
                `SELECT *
                 FROM ${ArticleCategory.TABLE_NAME}
                 WHERE article_id = ?
                   and category_id = ?`,
                [articleId, categoryId]
            );
            await connection.end();
            if (results.length === 0) {
                return null;
            }
            return new ArticleCategory(results[0].category_id, results[0].article_id);
        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }

    static async findCategoriesByArticleId(articleId) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`
                select distinct category.*
                from articles
                         join ${ArticleCategory.TABLE_NAME} ac on articles.id = ac.article_id
                         join ${Category.TABLE_NAME} category on ac.category_id = category.id
                where articles.id = ?
                group by category.name
                order by category.name asc
            `, [articleId]);
            await connection.end();

            return results.map(category => Category.fromDatabaseRecord(category).details());

        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }

    async save() {
        try {
            const connection = await getConnection();
            const query = `
                INSERT INTO ${ArticleCategory.TABLE_NAME} (article_id, category_id)
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
