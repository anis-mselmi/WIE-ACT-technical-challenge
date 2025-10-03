const express = require('express');
const router = express.Router();
const { createPost, listPosts, getPost, upvote, downvote, comment, deletePost } = require('../controllers/forumController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', listPosts);
router.post('/', authMiddleware, createPost);
router.get('/:id', getPost);
router.post('/:id/upvote', authMiddleware, upvote);
router.post('/:id/downvote', authMiddleware, downvote);
router.post('/:id/comment', authMiddleware, comment);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;