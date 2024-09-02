require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet"); // Import the Winston logger

const imageRoutes = require('./routes/imageRoutes');
const loginRoute = require('./routes/loginRoute');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authenticateToken = require("./utils/Securtiy");
const logger = require('./utils/logger');

const PORT = process.env.PORT;
const app = express();

// app.use(helmet());
app.use(bodyParser.json());
app.use(cors());


app.use('/api', imageRoutes);
app.use('/api', loginRoute);

app.use('/api', authenticateToken, postRoutes);
app.use('/api', authenticateToken, userRoutes);
app.use('/api', authenticateToken, categoryRoutes);


app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
