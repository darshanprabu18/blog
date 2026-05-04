import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const { title, content, image } = req.body;

    const post = await Post.create({
      title,
      content,
      image,
      author: req.user._id
    });

    const populatedPost = await post.populate('author', 'name email');
    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Only the author can update this post');
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;
    post.image = req.body.image ?? post.image;

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'name email');

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Only the author can delete this post');
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
