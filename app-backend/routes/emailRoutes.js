// routes/emailRoutes.js
const express = require('express');
const { sendTestEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/send-email', sendTestEmail);

module.exports = router;
