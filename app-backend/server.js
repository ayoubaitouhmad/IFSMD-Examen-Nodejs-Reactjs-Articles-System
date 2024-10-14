require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const imageRoutes = require('./routes/imageRoutes');
const authRoute = require('./routes/authRoute');
const emailRoutes = require('./routes/emailRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const authenticateToken = require("./utils/Securtiy");
const mongoDbConnection = require("./db/mongoDbConnection");

const User = require("./models/user");
const Article = require("./models/_Article");
const Articlex = require("./models/Article");

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', imageRoutes);
app.use('/api', authRoute);
app.use('/api', emailRoutes);

app.use('/api', authenticateToken, postRoutes);
app.use('/api', authenticateToken, userRoutes);
app.use('/api', authenticateToken, categoryRoutes);

app.use((req, res, next) => {
    // logger.info(`${req.method} ${req.url}`);
    next();
});

app.get('/mongo', async (req, res) => {
    const posts = await Article.latestPosts();
    res.status(200).json(
        posts
    );
});

app.get('/articles', async (req, res) => {
    let cc = await Articlex.latestPosts()
    res.status(200).json(cc);
});

mongoDbConnection().then(() => {
    console.log("MongoDB is connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    logger.error("Failed to connect to MongoDB", err);
    process.exit(1);
});
