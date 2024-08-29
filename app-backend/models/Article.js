const getConnection = require("../config/db");
const Comment = require("../models/commentModel");
const User = require("./userModel");
const logger = require("../utils/logger");
const FileDocument = require("./fileDocument");
const {IMAGE_PLACEHOLDER, IMAGE_PLACEHOLDER_280x187} = require("../services/imageService");

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

    static get TABLE_NAME() {
        return "articles";
    }


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
    get views() {
        return this.#views;
    }

    set views(value) {
        this.#views = value;
    }


    get urlTitle() {
        return this.#title.replaceAll(' ', '-');
    }



    get createdAt() {
        let date = new Date(this.#createdAt);
        if (date instanceof Date && !isNaN(date)) {
            const options = {day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('en-US', options);
        }
        return  this.createdAt;

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
            author: this.author,
            views: this.#views,
            // articleImageId: this.#articleImage,
            articleImage: this.#articleImage ?? {
                filePath: IMAGE_PLACEHOLDER_280x187
            },
            updatedAt: this.#updatedAt,
            createdAt: this.createdAt,
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

    async getAuthor() {
        try {
            let author = await  User.findById(this.#id);
            this.author = author ? author.detailsForArticle() : null;
        }catch (e){
            this.#articleImage = null;
        }
    }


    async fetchData(){
        await Promise.all([this.getImage(), this.getAuthor()]);
    }






    static async fetchArticles(query, params) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(query, params);
            await connection.end();

            return await Promise.all(results.map(async (post) => {
                let postModel = Article.fromDatabaseRecord(post);
                await postModel.fetchData();

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
        return await Article.fetchArticles(`select ${Article.TABLE_NAME}.*, username as 'author_username'
                                            from ${Article.TABLE_NAME}
                                                     join users u on u.id = ${Article.TABLE_NAME}.author_id`, []);
    }

    static async latestPosts() {
        return await Article.fetchArticles(`SELECT * FROM ${Article.TABLE_NAME} ORDER BY created_at DESC LIMIT 5`, []);
    }

    static async mostViewedArticles() {
        return await Article.fetchArticles(`SELECT * FROM ${Article.TABLE_NAME} ORDER BY views DESC LIMIT 6`, []);
    }

    static async filterByCreatedDate(date) {
        return await Article.fetchArticles(`SELECT * FROM ${Article.TABLE_NAME} WHERE DATE(created_at) >= DATE(?)`, [date]);
    }

    static async findById(id) {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`SELECT * FROM ${Article.TABLE_NAME} WHERE id=?`, [id]);
            await connection.end();

            if (results.length === 0) {
                return null; // Handle not found
            }
            let article = Article.fromDatabaseRecord(results[0]);

            await article.fetchData();

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
            article.article_image_id,
            article.updated_at,
            article.created_at,
        );
    }

    static fromAddArticle(title, description, content ,author_id) {
        return new Article(
            null,
            title,
            description,
            content,
            null,
            author_id,
            null,
            null,
            null,
            null,
        );
    }


    async save() {
        try {
            const connection = await getConnection();

            if (this.#id) {
                const query = `
                UPDATE ${Article.TABLE_NAME}
                SET title=?,
                    description=?,
                    content=?,
                    article_image_id=?,
                    views=?,
                    updated_at=NOW()
                WHERE id = ?
            `;
                await connection.execute(query, [
                    this.#title,
                    this.#description,
                    this.#content,
                    this.#articleImageId,
                    this.#views,
                    this.#id
                ]);

            } else {

                const query = `
                    INSERT INTO ${Article.TABLE_NAME} (title,description,content,article_image_id,author_id) 
                    VALUES (?,?,?,?,?)
                `;
                const [result] = await connection.execute(query, [
                    this.#title,
                    this.#description,
                    this.#content,
                    this.#articleImageId,
                    this.#authorId
                ]);
                this.#id = result.insertId;
            }
            await connection.end();
            return true;

        } catch (error) {
            logger.error(`Error saving user: ${error.message}`);
            return false;
        }
    }

    async delete() {
        try {
            const connection = await getConnection();
            const [results] = await connection.execute(`DELETE  FROM ${Article.TABLE_NAME} WHERE id=?`, [this.#id]);
            await connection.end();
            return  true;
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }


}

module.exports = Article;
