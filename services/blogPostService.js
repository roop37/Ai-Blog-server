const BlogPost = require("../models/BlogPost");

const createBlogPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const blogPost = new BlogPost({
    title,
    content,
    tags,
    author: req.user.userId,
  });

  try {
    const savedBlogPost = await blogPost.save();
    res.json(savedBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find(req.query).populate("author");
    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate("author");
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    await BlogPost.findByIdAndRemove(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
