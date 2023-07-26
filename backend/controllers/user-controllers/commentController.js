const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");
const commentModel = require("../../models/user-models/commentModel");

// * POST Request
// * Post /auth/user/post/?userId= & postId=
const commenting = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const verifiedUser = await userModel.findById(req.user.id);
  if (verifiedUser) {
    const existPost = await postModel.findById(req.query.postId);
    const user = await userModel.findById(req.query.userId);
    if (existPost && user) {
      const { comment, commentBy, commenterId } = req.body;
      const addComment = await commentModel.create({
        commentBy: `${verifiedUser.firstName} ${verifiedUser.lastName}`,
        comment,
        commenterId: verifiedUser.id,
        user: user.id,
        admin: admin.id,
        commentTo: `${user.username}`,
        post: existPost.id,
      });
      res.status(201).json(comment);
      existPost.comments.push(addComment._id);
      existPost.save();
    } else {
      res.status(401).json("Not Authorized");
    }
  }
});

// * GET Request
// * Get /user/postcomments/:id
const getComments = asyncHandler(async (req, res) => {
  const verifiedUser = await userModel.findById(req.user.id);
  if (verifiedUser) {
    const comments = await commentModel.find({ post: req.params.id });
    if (comments) {
      res.status(201).json(comments.comment);
    } else {
      res.status(401).json("No Comments");
    }
  } else {
    res.status(401).json("Not Authorized");
  }
});

// * GET Request
// * Get /auth/user/post/comment/:id
const getComment = asyncHandler(async (req, res) => {
  const verifiedUser = await userModel.findById(req.user.id);
  if (verifiedUser) {
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
  const user = await userModel.findById(req.user.id);
  if (user) {
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
  commenting,
  getComments,
  getComment,
  deleteComment,
};
