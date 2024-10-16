const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class CategoryCollection {
    static  collectionName = process.env.MONGODB_DB_CATEGORIES_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, CategoryCollection.collectionName)) {
            await mongoDatabaseConnection.createCollection(CategoryCollection.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["name", "created_at"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            description: {
                                bsonType: "string",
                                description: "must be a string"
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
        return mongoDatabaseConnection.collection(CategoryCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, CategoryCollection.collectionName)
    }
}


module.exports = CategoryCollection;