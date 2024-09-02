const getConnection = require("../config/db");
const User = require("../models/userModel");
const {sign} = require("jsonwebtoken");
const {info} = require("../utils/logger");


exports.login = async (req, res) => {
    info('fd');
    const {email, password} = req.body;


    const connection = await getConnection();

    const user = await User.findByEmailAndPassword(email, password);


    if (user === 0) return res.status(400).send('User not found');
    const token = sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '100h',
    });


    res.json({
        token,
        user
    });
};


