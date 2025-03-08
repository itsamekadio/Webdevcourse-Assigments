const express = require('express');
const router = express.Router();

let books = [
    {
        id: 1,
        title: 'The Great Gatsby', 
        available: true},
    {
        id: 2,
        title: 'Moby',
        available: true},
]
router.get('/', (req, res) => {
    res.json(books);
}
);
router.get('/:id', (req, res) => {  
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('The book with the given ID was not found');
    }
    res.json(book);
} );
router.post('/', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        available: true
    };
    books.push(book);
    res.json(book);
});
router.put('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('The book with the given ID was not found');
    }
    book.title = req.body.title;
    res.json(book);
});
router.delete('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        res.status(404).send('The book with the given ID was not found');
    }
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.json(book);
});
module.exports = router;