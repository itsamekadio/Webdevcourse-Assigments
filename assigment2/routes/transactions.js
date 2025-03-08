const express = require("express");
const router = express.Router();
const books = require("./books").books;

let transactions = [];

router.post("/borrow", (req, res) => {
  const { bookId, userId } = req.body;
  const book = books.find(b => b.id == bookId);
  
  if (!book || !book.available) return res.status(400).json({ error: "Book not available" });

  book.available = false;
  transactions.push({ bookId, userId, type: "borrow", date: new Date() });
  res.json({ message: "Book borrowed successfully" });
});

router.post("/return", (req, res) => {
  const { bookId, userId } = req.body;
  const book = books.find(b => b.id == bookId);
  
  if (!book) return res.status(400).json({ error: "Invalid book ID" });

  book.available = true;
  transactions.push({ bookId, userId, type: "return", date: new Date() });
  res.json({ message: "Book returned successfully" });
});

module.exports = router;
