const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../services/userService");
const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../services/commentService");

router.post("/", authenticateUser, createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.patch("/:id", authenticateUser, updateComment);
router.delete("/:id", authenticateUser, deleteComment);

module.exports = router;
