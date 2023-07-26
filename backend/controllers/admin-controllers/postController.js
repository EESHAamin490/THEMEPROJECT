const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");

// * GET Request
// * Get /auth/admin/post/:id
const showPost = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const post = await postModel.findById({user:req.params.id});
    //const getuser= await usermodel.findOne(request.params.id)
    if (!post) {
      return res.status(404).json({ message: "Photo not found" });
    } else {
      // ? res.sendfile(post.path);
      res.json(post);
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

// * GET Request
// * Get /auth/admin/posts
const getPosts = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const posts = await postModel.find();
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.json(posts);
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

// * DELETE Request
// * Delete /auth/admin/post/:id
const deletePost = asyncHandler(async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const post = await postModel.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      // ? res.sendfile(post.path);
      res.json({ message: "Post has been deleted", post });
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});

module.exports = {
  getPosts,
  showPost,
  deletePost,
};
