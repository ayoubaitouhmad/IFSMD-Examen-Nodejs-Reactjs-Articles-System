const mysql = require("mysql2/promise");

let dbConfig = {
    host: "localhost",
    database: 'ifsmd_node_js',
    user: "root",
    password: ""
};

const connection = async () => {
    return mysql.createConnection(dbConfig);
};

module.exports = connection;
