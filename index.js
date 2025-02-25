const express = require('express');
const app = express();
const port = 3000;
const booksrouter=require('./Books')
app.use(express.json())
app.use('/books',booksrouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

