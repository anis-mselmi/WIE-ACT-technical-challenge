const ForumPost = require('../models/ForumPost');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
  try {
    const post = new ForumPost({ ...req.body, author: req.user._id });
    await post.save();
    res.success(post, 201);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.listPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const posts = await ForumPost.find(filter).populate('author', 'name profile').sort('-createdAt');
    res.success(posts);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id).populate('author', 'name profile');
    if (!post) return res.fail('Post not found.', 404);
    const comments = await Comment.find({ post: post._id }).populate('author', 'name profile').sort('createdAt');
    res.success({ post, comments });
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.upvote = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.fail('Post not found.', 404);
    post.upvotes += 1;
    await post.save();
    res.success(post);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.downvote = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.fail('Post not found.', 404);
    post.downvotes += 1;
    await post.save();
    res.success(post);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.comment = async (req, res) => {
  try {
    const comment = new Comment({
      post: req.params.id,
      author: req.user._id,
      content: req.body.content
    });
    await comment.save();
    res.success(comment, 201);
  } catch (err) {
    res.fail(err, 400);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.fail('Post not found.', 404);
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.fail('Not authorized.', 403);
    }
    await post.deleteOne();
    res.success({ message: 'Post deleted.' });
  } catch (err) {
    res.fail(err, 400);
  }
};