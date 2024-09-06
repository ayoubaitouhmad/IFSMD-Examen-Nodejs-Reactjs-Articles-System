const {sendEmail} = require("../services/emailService");
const {loggers} = require("winston");
const {info} = require("../utils/logger");

const sendTestEmail = async (req, res) => {
    const { to, subject, message } = req.body;


    try {
        await sendEmail(to, subject, message);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        info(error);
        res.status(500).send(error);
    }
};

module.exports = {
    sendTestEmail,
};
