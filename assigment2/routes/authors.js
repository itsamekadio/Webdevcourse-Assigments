const express = require('express');
const router = express.Router();
let authors = [
    {
        id: 1,
        name: 'F. Scott Fitzgerald',
        available: true
    },
    {
        id: 2,
        name: 'Herman Melville',
        available: true
    },
]
router.get('/', (req, res) => {
    res.json(authors);
});
router.post('/', (req, res) => {
    const author = {
        id: authors.length + 1,
        name: req.body.name,
        available: true
    };
    authors.push(author);
    res.json(author);
});
module.exports = router;