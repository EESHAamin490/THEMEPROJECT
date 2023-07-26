const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");
const adminModel = require("../../models/admin-models/userModel");
// * POST Request
// * Post /auth/user/post/liked
const likePost = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const verifiedUser = await userModel.findById(req.user.id);
  if (verifiedUser) {
    const existPost = await postModel.findById(req.query.postId);
    const user = await userModel.findById(req.query.userId);
    if (existPost && user) {
      if (existPost.likes.includes(verifiedUser._id)) {
        return res
          .status(400)
          .json({ error: "User is already liked this post." });
      } else {
        existPost.likes.push(verifiedUser._id);
        existPost.save();
        res.json("Liked");
      }
    }
  }
});

// * GET Request
// * Get /auth/user/totallikes
const unLikePost = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const verifiedUser = await userModel.findById(req.user.id);
  if (verifiedUser) {
    const existPost = await postModel.findById(req.query.postId);
    const user = await userModel.findById(req.query.userId);
    if (existPost && user) {
      if (existPost.likes.includes(verifiedUser._id)) {
        return res.status(400).json({ error: "User is not liked this Post." });
      } else {
        existPost.likes = existPost.likes.filter(
          (id) => id.toString() !== verifiedUser._id
        );

        existPost.save();
        res.json("unliked");
      }
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

module.exports = {
  likePost,
  unLikePost,
};
