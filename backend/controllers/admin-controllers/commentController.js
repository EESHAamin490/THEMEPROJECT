const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");
const commentModel = require("../../models/user-models/commentModel");

// * GET Request
// * Get /auth/admin/post/comments
const getComments = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const comments = await commentModel.find({admin: req.user.id});
    if (comments) {
      res.status(201).json({ comments });
    } else {
      res.status(401).json("No Comments");
    }
  } else {
    res.status(401).json("Not Authorized");
  }
});

// * GET Request
// * Get /auth/admin/post/comment/:id
const getComment = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const comment = await commentModel.findById(req.params.id);
    if (comment) {
      res.status(201).json({ message: "comment is", comment });
    } else {
      res.status(401).json("No Comments");
    }
  } else {
    res.status(401).json("Not Authorized");
  }
});

// * DELETE Request
// * Delete /auth/user/post/comment/:id
const deleteComment = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const comment = await commentModel.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    } else {
      // ? res.sendfile(post.path);
      res.json({ message: "comment has been deleted", comment });
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

module.exports = {
  getComments,
  getComment,
  deleteComment,
};
