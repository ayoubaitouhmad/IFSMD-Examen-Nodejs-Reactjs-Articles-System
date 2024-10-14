const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class UserCollection {
    static  collectionName = process.env.MONGODB_DB_USERS_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, UserCollection.collectionName)) {
          await mongoDatabaseConnection.createCollection(UserCollection.collectionName, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["username", "name", "email", "created_at"],
                        properties: {
                            username: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            name: {
                                bsonType: "string",
                                description: "must be a string and is required"
                            },
                            bio: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            role: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            email: {
                                bsonType: "string",
                                pattern: "^.+@.+$",
                                description: "must be a valid email and is required"
                            },
                            password: {
                                bsonType: "string",
                                description: "must be a string"
                            },
                            profile_image_id: {
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
        return mongoDatabaseConnection.connect(UserCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, UserCollection.collectionName)
    }
}


module.exports = UserCollection;










