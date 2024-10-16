const mongoDbConnection = require("../mongoDbConnection");
const {checkIfCollectionExists} = require("../../utils/db");


class UserCollection {
    static  collectionName = process.env.MONGODB_DB_USERS_TABLE_NAME;
    static migrateCollection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        if (!await checkIfCollectionExists(mongoDatabaseConnection, UserCollection.collectionName)) {
            mongoDatabaseConnection.createCollection(UserCollection.collectionName);
            const validationSchema = {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Users Object Validation",
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
                                bsonType: ["string" , "null"],
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
                                bsonType: ["objectId" , "null"],
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
            }
            await mongoDatabaseConnection.command({
                collMod: UserCollection.collectionName,
                validator: validationSchema.validator,
                validationLevel: validationSchema.validationLevel,
                validationAction: validationSchema.validationAction
            });
        }
    };
    static  collection = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return mongoDatabaseConnection.collection(UserCollection.collectionName);
    }
    static isExists = async () => {
        const mongoDatabaseConnection = await mongoDbConnection();
        return await checkIfCollectionExists(mongoDatabaseConnection, UserCollection.collectionName)
    }
}


module.exports = UserCollection;










