const express = require("express");
const req = require("express/lib/request");

const router = express.Router()
let books = [
    { id: 1, title: "Book One", author: "Author One" },
    { id: 2, title: "Book Two", author: "Author Two" }
];


router.post('/', (req, res) => {
    const newbook={
        id: books.length+1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(newbook)
    res.json(books)
});
router.delete('/:id', (req, res) => {
    books = books.filter(book => book.id !== parseInt(req.params.id))
    res.json(books)
});
router.get('/', (req, res) => {
    res.json(books)
});
router.get('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id))
    res.json(book)
});
router.put('/:id',(req  ,res)=>{    
    const book = books.find(book => book.id === parseInt(req.params.id))
    book.title=req.body.title
    book.author=req.body.author
    res.json(book)
})
module.exports = router
;