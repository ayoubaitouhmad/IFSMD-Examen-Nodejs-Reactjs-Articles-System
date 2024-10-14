const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class FileCollection {
    static  collectionName = process.env.MONGODB_DB_FILES_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, FileCollection.collectionName)) {
            await   mongoDatabaseConnection.createCollection(FileCollection.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["file_name", "file_type", "file_path", "created_at"],
                        properties: {
                            file_name: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            file_type: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            file_path: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            storage: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            path: {
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
        return mongoDatabaseConnection.connect(FileCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, FileCollection.collectionName)
    }
}


module.exports = FileCollection;







