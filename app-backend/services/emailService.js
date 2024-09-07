const nodemailer = require('nodemailer');
const {info} = require('../utils/logger');
const sendEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to,
        subject,
        html :message,
    };

    try {
        const x = await transporter.sendMail(mailOptions);
        info('Email sent: ' + x.messageId);
    } catch (error) {
        info('Error sending email:', error);
    }
};

module.exports = {
    sendEmail,
};
