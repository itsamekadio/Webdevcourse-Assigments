const express = require('express');
const postgresscon = require('./connections/postgres');
const mongoose = require('./connections/mongo');
const authorrouter = require('./routes/author');
const postrouter = require('./routes/posts');
const app = express();
app.use(express.json());
app.use('/authors', authorrouter);
app.use('/posts', postrouter);
app.listen(3000, () => {
  console.log('Server started');
});
postgresscon.sync({ alter: true }).then(() => {
    console.log('PostgreSQL synced');
}).catch(err => console.error('Sync error:', err));
