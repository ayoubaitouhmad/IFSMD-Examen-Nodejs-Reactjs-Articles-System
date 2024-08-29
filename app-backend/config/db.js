const mysql = require("mysql2/promise");

let dbConfig = {
    host: "localhost",
    database: 'ifsmd_examen_nodejs_reactjs',
    user: "mrx",
    password: "mrx"
};

const connection = async () => {
    return mysql.createConnection(dbConfig);
};

module.exports = connection;
