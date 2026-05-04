import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const router = express.Router();

router.get('/:postId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'name email')
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { text, post } = req.body;

    const targetPost = await Post.findById(post);
    if (!targetPost) {
      res.status(404);
      throw new Error('Post not found');
    }

    const comment = await Comment.create({
      text,
      post,
      user: req.user._id
    });

    const populatedComment = await comment.populate('user', 'name email');
    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
});

export default router;
