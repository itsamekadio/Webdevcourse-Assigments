const express = require('express');
const Post = require('../models/postmongo');
const router = express.Router();
router.post('/', async (req, res) => {
      const post = new Post(req.body);
      await post.save();
      res.status(201).json(post);});
router.get('/', async (req, res) => {
        const posts = await Post.find();
        res.json(posts);
      });      
      
router.put('/:id', async (req, res) => {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
      });
router.delete('/:id', async (req, res) => {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
      });
module.exports = router;            