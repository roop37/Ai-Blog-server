const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../services/userService");
const {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../services/blogPostService");

router.post("/", authenticateUser, createBlogPost);
router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);
router.patch("/:id", authenticateUser, updateBlogPost);
router.delete("/:id", authenticateUser, deleteBlogPost);

module.exports = router;
