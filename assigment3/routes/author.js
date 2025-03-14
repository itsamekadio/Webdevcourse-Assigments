const express = require('express');
const Author = require('../models/Authorpg');
const router = express.Router();


router.post('/', async (req, res) => {
    const author = await Author.create(req.body);
    res.status(201).json(author);
 
});
router.get('/', async (req, res) => {
  const authors = await Author.findAll();
  console.log('Authors from DB:', authors); // Debugging log m4 gaybo ai 

  res.json(authors);
});
router.put('/:id', async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  await author.update(req.body);
  res.json(author);
});
router.delete('/:id', async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  await author.destroy();
  res.json({ message: 'etla8a ' });
});
module.exports = router;
