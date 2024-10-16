const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class ArticleCategoryCollection {
    static  collectionName = process.env.MONGODB_DB_ARTICLE_CATEGORY_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, ArticleCategoryCollection.collectionName)) {
            await mongoDatabaseConnection.createCollection(ArticleCategoryCollection.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["article_id", "category_id"],
                        properties: {
                            article_id: {
                                bsonType: "objectId",
                                description: "must be a valid ObjectId and is required"
                            },
                            category_id: {
                                bsonType: "objectId",
                                description: "must be a valid ObjectId and is required"
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
        return mongoDatabaseConnection.collection(ArticleCategoryCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, ArticleCategoryCollection.collectionName)
    }
}


module.exports = ArticleCategoryCollection;