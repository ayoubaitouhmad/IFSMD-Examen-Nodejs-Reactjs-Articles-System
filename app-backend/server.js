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
const {uploadImage} = require("./services/imageService");
const {join} = require("node:path");
const {IMAGES_UPLOAD_DUR} = require("./config/imageStorage");
const {unlink} = require("node:fs");






const app = express();

app.use(bodyParser.json());

app.use(cors());


app.use('/api/uploads', express.static(join(__dirname, 'uploads')));


app.post('/api/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            return res.status(404).json({message: err});
        }
        if (req.file == undefined) {
            return res.status(400).json({message: 'No file selected'});
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            filename: req.file.filename,
            path: `${IMAGES_UPLOAD_DUR+req.file.filename}`
        });
    });
});


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


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
