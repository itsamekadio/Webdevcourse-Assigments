const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const booksRoutes = require("./routes/books");
const authorsRoutes = require("./routes/authors");
const usersRoutes = require("./routes/users");
const transactionsRoutes = require("./routes/transactions");

const authMiddleware = require("./middleware/auth");

app.use(express.json());  
app.use(authMiddleware);  

app.use("/books", booksRoutes);
app.use("/authors", authorsRoutes);
app.use("/users", usersRoutes);
app.use("/transactions", transactionsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
