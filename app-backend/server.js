const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const getConnection = require("./config/db");
const {sign} = require("jsonwebtoken");
const authenticateToken = require("./utils/Securtiy");
const User = require("./models/userModel");
const logger = require("./utils/logger");


const fs = require("fs");

const path = require("path");
const {IMAGES_UPLOAD_DUR} = require("./config/imageStorage");
const {loggers} = require("winston");
const sharp = require('sharp');
const e = require("express");


const PORT = process.env.PORT;


const app = express();

app.use(bodyParser.json());

app.use(cors());


app.get('/api/image/:name', (req, res) => {
    const imageName = req.params.name;
    const width = req.query.w ? parseInt(req.query.w) : null;
    const height = req.query.h ? parseInt(req.query.h) : null;


    const directoryPath = path.join(__dirname, IMAGES_UPLOAD_DUR);


    // Search for the file in the directory without needing to know the extension
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({message: 'Unable to scan directory'});
        }

        // Find a file that starts with the given image name
        const matchedFile = files.find(file => file.startsWith(imageName));

        if (!matchedFile) {
            return res.status(404).json({message: 'Image not found'});
        }

        const imagePath = path.join(directoryPath, matchedFile);

        // Set the content type based on the file extension
        const fileExtension = path.extname(matchedFile).toLowerCase();
        let contentType = 'application/octet-stream'; // Default content type
        if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === '.png') {
            contentType = 'image/png';
        } else if (fileExtension === '.gif') {
            contentType = 'image/gif';
        }


        res.setHeader('Content-Type', contentType);
        const readStream = fs.createReadStream(imagePath);

        if (width && height) {
            const transform = sharp()
                .resize(width, height, {
                    fit: sharp.fit.cover, // Ensures the image covers the entire specified area
                    position: sharp.position.center, // Centers the crop
                });

            readStream.pipe(transform).pipe(res);
        } else {
            readStream.pipe(res);
        }



        readStream.on('error', (streamErr) => {
            console.error('Error streaming image:', streamErr);
            res.status(500).json({message: 'Error streaming image'});
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
        expiresIn: '100h',
    });


    res.json({
        token,
        user
    });


});

app.use('/api', authenticateToken, postRoutes);
app.use('/api', authenticateToken, userRoutes);
app.use('/api', authenticateToken, categoryRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
