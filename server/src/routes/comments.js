// server/src/routes/comments.js
const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// 1) Listar comentarios de un post (público)
router.get('/', async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.findAll({
    where: { postId },
    include: [{ model: User, attributes: ['id','username'] }],
    order: [['createdAt', 'ASC']]
  });
  res.json(comments);
});

// 2) Crear comentario en un post (protegido)
router.post('/', authenticate, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'El contenido es obligatorio.' });

  // Verificar que el post exista
  const post = await Post.findByPk(postId);
  if (!post) return res.status(404).json({ message: 'Post no encontrado.' });

  const newComment = await Comment.create({
    content,
    postId,
    userId: req.user.id
  });
  res.status(201).json(newComment);
});

// 3) Editar propio comentario (protegido)
router.put('/:commentId', authenticate, async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await Comment.findByPk(commentId);
  if (!comment) return res.status(404).json({ message: 'Comentario no encontrado.' });
  if (comment.userId !== req.user.id) return res.status(403).json({ message: 'No autorizado.' });

  await comment.update({ content });
  res.json(comment);
});

// 4) Borrar propio comentario (protegido)
router.delete('/:commentId', authenticate, async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId);
  if (!comment) return res.status(404).json({ message: 'Comentario no encontrado.' });
  if (comment.userId !== req.user.id) return res.status(403).json({ message: 'No autorizado.' });

  await comment.destroy();
  res.json({ message: 'Comentario eliminado.' });
});

module.exports = router;