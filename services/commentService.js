const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const comment = new Comment({ content, postId, author: req.user.userId });

  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find(req.query).populate("author");
    res.json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("author");
    res.json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
