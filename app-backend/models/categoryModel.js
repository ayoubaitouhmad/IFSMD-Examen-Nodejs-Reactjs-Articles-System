const getConnection = require("../config/db");
const logger = require("../utils/logger");

class Category {

    static get TABLE_NAME() {
        return process.env.DB_CATEGORIES_TABLE_NAME;
    }

    #id;
    #name;
    #description;
    #createdAt;
    #updatedAt;


    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get name() {
        return this.#name;
    }

    get nameForUrl() {
        return this.name.toLowerCase().replace(' ', '-');
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set createdAt(value) {
        this.#createdAt = value;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    set updatedAt(value) {
        this.#updatedAt = value;
    }

    constructor(id, name, description, createdAt, updatedAt) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    details() {
        return {
            id: this.id,
            name: this.name,
            nameForUrl: this.nameForUrl,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }


    static fromDatabaseRecord(category) {
        return new Category(
            category.id,
            category.name,
            category.description,
            category.created_at,
            category.updated_at,
        );
    }


    static async all() {
        const connection = await getConnection();
        const [results] = await connection.execute(`select *
                                                    from ${Category.TABLE_NAME}`);
        await connection.end();
        return await Promise.all(results.map(async (category) => Category.fromDatabaseRecord(category).details()));
    }

    static async allWithArticlesCount() {
        const connection = await getConnection();
        const [results] = await connection.execute(`
            select categories.*,
                   (select count(article_category.category_id)
                    from article_category
                    where article_category.category_id = ac.category_id) as articles_count
            from categories
                     left join article_category ac on categories.id = ac.category_id
            group by name

        `);
        await connection.end();
        return await Promise.all(results.map(async (category) => {
            const categoryModel = Category.fromDatabaseRecord(category);
            let categoryModelDetails = categoryModel.details();
            categoryModelDetails.ArticlesCount = category.articles_count
            return categoryModelDetails;
        }));
    }

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT *
                                                        FROM ${Category.TABLE_NAME}
                                                        WHERE id = ?`, [id]);
            await connection.end();

            if (results.length === 0) {
                return null;
            }
            return Category.fromDatabaseRecord(results[0]);
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }
}

module.exports = Category;
