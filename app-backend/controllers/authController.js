const User = require("../models/userModel");
const {sign} = require("jsonwebtoken");


/**
 * Handle login functionality
 */
exports.login = async (req, res) => {
    const {email, password, rememberMe} = req.body;

    const user = await User.findByEmailAndPassword(email, password);
    if (user == null) return res.status(400).send('User not found');
    const token = sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: rememberMe ? process.env.JWT_DEFAULT_REMEMBER_ME_EXPIRES_IN : process.env.JWT_DEFAULT_EXPIRES_IN,
    });

    res.json({
        token,
        user
    });
};

/**
 * Handle Register functionality
 */
exports.register = async (req, res) => {
    const {name, username, email, password, confirmPassword} = req.body;
    const user = await User.fromRegister(
        name, username, email, password
    );
    await user.save();
    let alert = {
        type: "success",
        title: "Success!",
        body: "Congratulations, your account has been successfully created."
    };
    res.json({
        alert
    });
};