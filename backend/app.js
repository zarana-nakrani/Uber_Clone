const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRouters = require('./routes/user.route')
const connectDb = require('./db/db')
const cookies = require('cookie-parser')
const captainRouter = require('./routes/captain.route')

connectDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookies())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRouters)
app.use('/captains', captainRouter)
module.exports = app
