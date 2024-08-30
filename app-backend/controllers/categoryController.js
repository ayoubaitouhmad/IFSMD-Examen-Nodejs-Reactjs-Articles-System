const logger = require('../utils/logger');
const getConnection = require("../config/db");
const ArticleCategory = require('../models/articleCategory');


exports.getAll = async (req, res) => {
    try {
        const connection = await getConnection();
        const [results] = await connection.execute(`SELECT * FROM categories order by name asc `, []);
        await connection.end();
        if (results.length === 0) {
            return null;
        }
        res.json(results);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};

exports.addCategory = async (req,res) => {
    try {

        res.status(200).json('fdsf');
    } catch (err) {
        logger.error(err.message);
        return res.status(500).send('Server error'); // Send a 500 status for server errors
    }
};
