// server/src/routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Listar posts
router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ['id','username'] }],
    order: [['createdAt', 'DESC']]
  });
  res.json(posts);
});

// Ver un post
router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [{ model: User, attributes: ['id','username'] }]
  });
  if (!post) return res.status(404).json({ message: 'Post no encontrado.' });
  res.json(post);
});

// Crear post
router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Faltan campos.' });
  const newPost = await Post.create({ title, content, userId: req.user.id });
  res.status(201).json(newPost);
});

// Actualizar post
router.put('/:id', authenticate, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado.' });
  if (post.userId !== req.user.id) return res.status(403).json({ message: 'No autorizado.' });
  const { title, content } = req.body;
  await post.update({ title, content });
  res.json(post);
});

// Borrar post
router.delete('/:id', authenticate, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado.' });
  if (post.userId !== req.user.id) return res.status(403).json({ message: 'No autorizado.' });
  await post.destroy();
  res.json({ message: 'Post eliminado.' });
});

module.exports = router;