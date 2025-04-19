const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const cors = require('cors');
const userRouters = require('./routes/user.route')
const connectDb = require('./db/db')

connectDb();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/users', userRouters)
module.exports = app;