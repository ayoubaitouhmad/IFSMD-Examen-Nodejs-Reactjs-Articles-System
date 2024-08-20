const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const getConnection = require("./config/db");
const {sign} = require("jsonwebtoken");


const logger = require('pino')()




const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', postRoutes);
app.use('/api', userRoutes);

app.post('/api/login', async  (req, res) => {
    const { email, password } = req.body;



    const connection = await getConnection();

    const [rows] = await connection.execute(
        `SELECT * FROM users WHERE email = ? and password= ?`,
        [email ,  password]
    );
    if (rows.length === 0) return res.status(400).send('User not found');
    const user = rows[0];
    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    logger.info(token)
    res.json({ token });


});


const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
