const getConnection = require("../config/db");
const Comment = require("../models/commentModel");
const User = require("./userModel");
const logger = require("../utils/logger");
const FileDocument = require("./fileDocument");

class Article {

    #id;
    #title;
    #description;
    #content;
    #isFeaturedBlog;
    #authorId;
    #views;
    #articleImageId;
    #articleImage;
    #updatedAt;
    #createdAt;

    get id() {
        return this.#id;
    }
    get authorId() {
        return this.#authorId;
    }

    get title() {
        return this.#title;
    }

    get articleImageId() {
        return this.#articleImageId;
    }

    set articleImageId(id) {
        this.#articleImageId = id;
    }

    set title(value) {
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get content() {
        return this.#content;
    }

    set content(value) {
        this.#content = value;
    }


    get urlTitle() {
        return this.#title.replaceAll(' ', '-');
    }


    constructor(
        id,
        title,
        description,
        content,
        isFeaturedBlog,
        authorId,
        views,
        articleImageId,
        updatedAt,
        createdAt
    ) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#content = content;
        this.#isFeaturedBlog = isFeaturedBlog;
        this.#authorId = authorId;
        this.#views = views;
        this.#articleImageId = articleImageId;
        this.#updatedAt = updatedAt;
        this.#createdAt = createdAt;

    }

    // Public getter for article details
    details() {
        return {
            id: this.#id,
            title: this.#title,
            urlTitle: this.urlTitle,
            description: this.#description,
            content: this.#content,
            isFeaturedBlog: this.#isFeaturedBlog,
            authorId: this.#authorId,
            views: this.#views,
            // articleImageId: this.#articleImage,
            articleImage: this.#articleImage ?? {
                filePath: ''
            },
            updatedAt: this.#updatedAt,
            createdAt: this.#createdAt,
        };
    }


    async getImage() {
        try {

            let articleImageModel = await FileDocument.findById(this.#articleImageId);
            this.#articleImage = articleImageModel ? articleImageModel.details() : null;
        }catch (e){
            this.#articleImage = null;
        }
    }

    static async fetchArticles(query, params) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(query, params);
            await connection.end();

            return await Promise.all(results.map(async (post) => {
                let postModel = Article.fromDatabaseRecord(post);
                await postModel.getImage();
                post.author_id = {
                    id: post.author_id,
                    username: post.author_username
                };

                return postModel.details();
            }));


        } catch (error) {
            logger.error(`Error fetching articles: ${error.message}`);
            return [];
        }
    }

    static async articles() {
        return await Article.fetchArticles(`select articles.*, username as 'author_username'
                                            from articles
                                                     join users u on u.id = articles.author_id`, []);
    }

    static async latestPosts() {
        return await Article.fetchArticles('SELECT * FROM articles ORDER BY created_at DESC LIMIT 5', []);
    }

    static async mostViewedArticles() {
        return await Article.fetchArticles('SELECT * FROM articles ORDER BY views DESC LIMIT 6', []);
    }

    static async filterByCreatedDate(date) {
        return await Article.fetchArticles('SELECT * FROM articles WHERE DATE(created_at) >= DATE(?)', [date]);
    }

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute('SELECT * FROM articles WHERE id=?', [id]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle not found
            }
            let article = Article.fromDatabaseRecord(results[0]);

            await article.getImage();

            return article;

        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }


    static fromDatabaseRecord(article) {
        return new Article(
            article.id,
            article.title,
            article.description,
            article.content,
            article.is_featured_blog,
            article.author_id,
            article.views,
            article.article_image,
            article.updated_at,
            article.created_at,
        );
    }


    async save() {
        try {
            const connection = await getConnection();
            const query = `
                UPDATE articles
                SET title=?,
                    description=?,
                    content=?,
                    article_image=?,
                    updated_at=NOW()
                WHERE id = ?
            `;
            await connection.execute(query, [
                this.#title,
                this.#description,
                this.#content,
                this.#articleImageId,
                this.#id
            ]);
            await connection.end();
            return true;
        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }

    async checkArticleOwnership(authorId, ArticleId) {

    }


}

module.exports = Article;
