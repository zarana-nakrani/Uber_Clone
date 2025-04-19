const mongoose = require('mongoose');

function connectDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('MongoDB is connected')
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = connectDb;