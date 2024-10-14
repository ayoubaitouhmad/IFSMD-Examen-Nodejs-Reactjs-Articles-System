const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class ArticleCollection {
    static  collectionName = process.env.MONGODB_DB_ARTICLES_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, ArticleCollection.collectionName)) {
            await   mongoDatabaseConnection.createCollection(ArticleCollection.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["title", "content", "author_id", "created_at"],
                        properties: {
                            title: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            description: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            content: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            is_featured_blog: {
                                bsonType: "bool",
                                description: "must be a boolean"
                            },
                            author_id: {
                                bsonType: "objectId",
                                description: "must be a valid ObjectId"
                            },
                            views: {
                                bsonType: "int",
                                description: "must be an integer"
                            },
                            article_image_id: {
                                bsonType: "objectId",
                                description: "must be a valid ObjectId"
                            },
                            created_at: {
                                bsonType: "date",
                                description: "must be a date and is required"
                            },
                            updated_at: {
                                bsonType: "date",
                                description: "must be a date"
                            }
                        }
                    }
                },
                validationLevel: "strict",
                validationAction: "error"
            });
            return true;
        }
        return false;
    };
    static  collection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return mongoDatabaseConnection.connect(ArticleCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, ArticleCollection.collectionName)
    }
}


module.exports = ArticleCollection;