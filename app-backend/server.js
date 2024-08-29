const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const getConnection = require("./config/db");
const {sign} = require("jsonwebtoken");
const authenticateToken = require("./utils/Securtiy");
const User = require("./models/userModel");
const logger = require("./utils/logger");



const fs= require("fs");

const path = require("path");
const {IMAGES_UPLOAD_DUR} = require("./config/imageStorage");
const {loggers} = require("winston");


const PORT = process.env.PORT;



const app = express();

app.use(bodyParser.json());

app.use(cors());


app.get('/api/image/:name', (req, res) => {
    const imageName = req.params.name;
    const imagePath = path.join(__dirname, IMAGES_UPLOAD_DUR, imageName);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Set the content type based on the file extension
        const fileExtension = path.extname(imageName).toLowerCase();
        let contentType = 'application/octet-stream'; // Default content type
        if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === '.png') {
            contentType = 'image/png';
        } else if (fileExtension === '.gif') {
            contentType = 'image/gif';
        }

        // Stream the file to the client
        res.setHeader('Content-Type', contentType);
        const readStream = fs.createReadStream(imagePath);
        readStream.pipe(res);

        // Handle errors during streaming
        readStream.on('error', (streamErr) => {
            console.error('Error streaming image:', streamErr);
            res.status(500).json({ message: 'Error streaming image' });
        });
    });
});



app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));



app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;


    const connection = await getConnection();

    const user = await User.findByEmailAndPassword(email, password);



    if (user === 0) return res.status(400).send('User not found');
    const token = sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });


    res.json({
        token,
        user
    });


});

app.use('/api', authenticateToken, postRoutes);
app.use('/api', authenticateToken, userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
