const mysql = require("mysql2/promise");

let dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const connection = async () => {
    try {
        return await mysql.createConnection(dbConfig)
    }catch (err){
        console.log(err);
    }
};

module.exports = connection;
