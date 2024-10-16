const {ObjectId} = require("mongodb");
const getConnection = require("../config/db");
const logger = require("../utils/logger");
const MoFileModel = require("./MoFileModel");
const ArticleCategoryCollection = require("../db/migrations/articleCategory");
const MoArticleCategory = require("./MoArticleCategory");
const ArticleCollection = require("../db/migrations/articles");
const {IMAGE_PLACEHOLDER} = require("../services/imageService");
const {th} = require("@faker-js/faker");
const MoUser = require("./MoUserModel");
const UsersCollection = require("../db/migrations/users");


class MoArticle {
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
        return process.env.DB_ARTICLES_TABLE_NAME;
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
        return this.createdAt;
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
        updatedAt = new Date(),
        createdAt)
    {
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


    static fromDatabaseRecord(article) {
        return new MoArticle(
            article._id,
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

    static fromAddArticle(title, description, content, author_id) {
        return new MoArticle(
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
            categories: this.categories,
            // articleImageId: this.#articleImage,
            articleImage: this.#articleImage ?? {
                filePath: IMAGE_PLACEHOLDER
            },
            updatedAt: this.#updatedAt,
            createdAt: this.createdAt,
        };
    }


    async getImage() {
        try {
            let articleImageModel = await MoFileModel.findById(this.#articleImageId);
            this.#articleImage = articleImageModel ? articleImageModel.details() : null;
        } catch (e) {
            console.log(e)
            this.#articleImage = null;
        }
    }

    /**
     * Retrieves the author of this article from the database and stores it in this object as a property named `author`.
     * The `author` property is an object with two properties: `id` and `username`.
     * @returns {Promise<void>}
     */
    async getAuthor() {
        try {
            const MoUser = require("./MoUserModel");
            const author = await MoUser.findById(this.#authorId);
            if (author) {
                this.author = author.detailsForArticle();
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getCategories() {
        try {

            // const moCategory = await MoCategoryModel.all();
            // for (const moCategoryElement of moCategory) {
            //     const moArticleCategory = new MoArticleCategory(
            //         moCategoryElement.id,
            //         this.#id,
            //     );
            //     await moArticleCategory.save();
            // }

            this.categories = await MoArticleCategory.findCategoriesByArticleId(this.id);
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }

    async fetchData() {
        await Promise.all([this.getImage(), this.getAuthor(), this.getCategories()]);
    }


    static async fetchArticles(query, options) {
        try {
            const collection = await ArticleCollection.collection();
            const results = await collection.find(query, options).toArray();

            return Promise.all(results.map(async (post) => {
                let postModel = MoArticle.fromDatabaseRecord(post);
                await postModel.fetchData();
                return postModel.details();
            }));
        } catch (error) {

            logger.error(`Error fetching articles: ${error.message}`);
            return [];
        }
    }

    static async articles() {
        return await MoArticle.fetchArticles({}, {});
    }

    static async latestPosts() {
        return await MoArticle.fetchArticles({}, {
            limit: 5,
            sort: {
                created_at: -1
            }
        });
    }

    static async mostViewedArticles() {
        return await MoArticle.fetchArticles({}, {
            limit: 6,
            sort: {
                views: -1
            }
        });
    }

    static async filterByCreatedDate(date) {
        return await MoArticle.fetchArticles({
            created_at: {$gte: new Date(date)}
        }, {
            sort: {
                created_at: -1
            }
        });
    }

    static async findById(id) {
        try {
            const collection = await ArticleCollection.collection();
            const result = await collection.findOne({_id: new ObjectId(id)});
            if(result=== null){
                return null;
            }
            const postModel = MoArticle.fromDatabaseRecord(result);
            await postModel.fetchData();
            return postModel;
        } catch (error) {
            logger.error(`Error finding article by ID ${id}: ${error.message}`);
            return null;
        }
    }

    static async findCategoryArticles(category_id) {
        try {
            const collection = await ArticleCollection.collection();
            const results = await collection.aggregate([
                {
                    $lookup: {
                        from: ArticleCategoryCollection.collectionName,
                        localField: "_id",
                        foreignField: "article_id",
                        as: "categories"
                    }
                },
                {
                    $match: {
                        "categories.category_id": new ObjectId(category_id)
                    }
                }
            ]).toArray();

            return Promise.all(results.map(async (article) => {
                let postModel = MoArticle.fromDatabaseRecord(article);
                await postModel.fetchData();
                return postModel.details();
            }));
        } catch (error) {
            logger.error(`Error finding articles for category ID ${category_id}: ${error.message}`);
            return [];
        }

    }

    static async findUserArticles(id) {
        try {
            const collection = await ArticleCollection.collection();

            const results = await collection.find(
                { author_id: new ObjectId(id) }
            ).sort({ created_at: -1 }).toArray();

            return await Promise.all(results.map(async (post) => {
                let postModel = MoArticle.fromDatabaseRecord(post);
                await postModel.getImage();
                return postModel.details();
            }));

        } catch (error) {
            console.log(error)
            // logger.error(`Error finding articles for user ${id}: ${error.message}`);
            return null;
        }
    }

    async save() {
        try {
            const collection = await ArticleCollection.collection();


            const articleData = {
                title: this.#title,
                description: this.#description,
                content: this.#content,
                article_image_id: this.#articleImageId,
                author_id: this.#authorId,
                views: this.#views,
                updated_at: new Date()
            };

            if (this.#id) {
                // Update existing document
                const result = await collection.updateOne(
                    { _id: new ObjectId(this.#id) },
                    { $set: articleData }
                );

                if (result.matchedCount === 0) {
                    throw new Error('No document found with the given ID');
                }
            } else {
                // Insert new document
                articleData.created_at = new Date();
                const result = await collection.insertOne(articleData);
                this.#id = result.insertedId;
            }

            return true;
        } catch (error) {

            console.clear();
            // console.log(JSON.stringify(error))
            console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied)
            console.log(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0])
            logger.error(`Error saving article: ${error.message}`);
            return false;
        }
    }
    async delete() {
        try {
            await MoArticle.delete(this.#id);
        } catch (error) {
            logger.error(`Error deleting article with ID ${this.#id}: ${error.message}`);
            return false;
        }
    }

    static async delete(_id) {
        try {
            const collection = await ArticleCollection.collection();

            const result = await collection.deleteOne({ _id });

            if (result.deletedCount === 1) {

                return true;
            } else {

                return false;
            }
        } catch (error) {

            console.log(error)
            return false;
        }
    }
}

module.exports = MoArticle;
