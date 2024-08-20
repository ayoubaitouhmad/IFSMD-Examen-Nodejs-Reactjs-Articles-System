const User = require("../models/userModel");


const logger = require('../utils/logger');

exports.findById = async (req, res) => {
    try {
        let {id} = req.query;
        let user = await User.findById(id);
        return res.json(user);
    } catch (err) {
        logger.info(err);
        res.status(500).send(err);
    }
};
