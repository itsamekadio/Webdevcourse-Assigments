const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blogdb');

const con = mongoose.connection;
con.on('error', console.error.bind(console, 'Connection error:'));
con.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;