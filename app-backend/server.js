const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', postRoutes);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
