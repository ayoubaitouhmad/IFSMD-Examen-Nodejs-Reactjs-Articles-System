const getConnection = require("../config/db");
const Comment = require("../models/commentModel");
const User = require("./userModel");
const logger = require("../utils/logger");

class Article {

    #id;
    #title;
    #description;
    #content;
    #isFeaturedBlog;
    #authorId;
    #updatedAt;
    #createdAt;


    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }


    constructor(
        id,
        title,
        description,
        content,
        isFeaturedBlog,
        authorId,
        updatedAt,
        createdAt
    ) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#content = content;
        this.#isFeaturedBlog = isFeaturedBlog;
        this.#authorId = authorId;
        this.#updatedAt = updatedAt;
        this.#createdAt = createdAt;

    }

    // Public getter for article details
    details() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            content: this.#content,
            isFeaturedBlog: this.#isFeaturedBlog,
            authorId: this.#authorId,
            updatedAt: this.#updatedAt,
            createdAt: this.#createdAt,
        };
    }




    static async fetchArticles(query, params) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(query, params);
            await connection.end();

            return await Promise.all(results.map(async (post) => {
                const postModel = new Article(
                    post.id,
                    post.title,
                    post.description,
                    post.content,
                    post.is_featured_blog,
                    post.author_id,
                    post.updated_at,
                    post.created_at
                );
                await postModel.fetchComments();
                await postModel.fetchAuthor();
                return postModel;
            }));
        } catch (error) {
            logger.error(`Error fetching articles: ${error.message}`);
            return [];
        }
    }

    static async posts() {
        return await this.fetchArticles('SELECT * FROM articles', []);
    }

    static async latestPosts() {
        return await this.fetchArticles('SELECT * FROM articles ORDER BY created_at DESC LIMIT 5', []);
    }

    static async mostViewedArticles() {
        return await this.fetchArticles('SELECT * FROM articles ORDER BY views DESC LIMIT 6', []);
    }

    static async filterByCreatedDate(date) {
        return await this.fetchArticles('SELECT * FROM articles WHERE DATE(created_at) >= DATE(?)', [date]);
    }

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM articles WHERE id=?', [id]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle not found
            }

            const article = new Article(
                results[0].id,
                results[0].title,
                results[0].description,
                results[0].content,
                results[0].is_featured_blog,
                results[0].author_id,
                results[0].updated_at,
                results[0].created_at
            );
            await article.fetchComments();
            await article.fetchAuthor();
            return article;
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static loadFromDatabase(article) {
        return new Article(
            article.id,
            article.title,
            article.description,
            article.content,
            article.is_featured_blog,
            article.author_id,
            article.updated_at,
            article.created_at,
        );
    }
}

module.exports = Article;
