require('dotenv').config();
const {MongoClient} = require("mongodb");
const logger = require("../utils/logger");

const connectionString = process.env.MONGODB_CONNECTION_STRING || "";
const mongoDbDatabaseName = process.env.MONGODB_DB_NAME || "";

let dbInstance = null;

const mongoDbConnection = async () => {
    if (dbInstance) {
        return dbInstance;
    }
    try {
        const client = new MongoClient(connectionString);
        await client.connect();
        return  dbInstance = client.db(mongoDbDatabaseName);
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        throw e; // Propagate the error so calling code can handle it
    }
};

module.exports = mongoDbConnection;
