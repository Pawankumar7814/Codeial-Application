const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Error while connecting to the database'));

db.once('open', function() {
    console.log('Connected to database :: MongoDB');
});

module.exports = db;