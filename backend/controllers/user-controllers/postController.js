const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");
const adminModel = require("../../models/admin-models/userModel");
const cloudinary = require("cloudinary");
const CLOUDINARY_USER_NAME="dtuq0adwr"
const CLOUDINARY_API_KEY=991988652127931
const CLOUDINARY_API_SECRET="XL6mVRv_YxnTYQObV4xh8ZQxEBA"
cloudinary.config({
  cloud_name: CLOUDINARY_USER_NAME,
  api_key:CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// * POST Request
// * Post /auth/user/post/upload
const uploadPost = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const user = await userModel.findById(req.user.id);
  if (user) {
    const { caption, uploadDate } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: `${user._id}_post`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    const uploadPost = await postModel.create({
      image: result.url,
      caption,
      uploadDate,
      user: req.user.id,
      username: user.username,
      admin: admin.id,
    });
    res.status(201).json("Post Uploaded");
    user.posts.push(uploadPost.id);
    user.save();
    // console.log(image)
  } else {
    res.status(400).json({ message: "User not authorized" });
  }});
// * GET Request
// * Get /auth/user/post/:id
const showPost = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
    const post = await postModel.findById(req.params.id);
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
// * Get /auth/user/posts
const getPosts = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
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
// * Delete /auth/user/post/:id
const deletePost = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
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

// * PUT Request
// * Update /auth/user/post/:id
const updatePost = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    
    const { caption } = req.body;
    
    console.log(req.body)
    if (!user) {
      res.status(400).json({ message: "User not authorized" });
      throw new Error("User not found");
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { caption },
      { new: true }
    );

    res.send(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// * GET Request
// * Get /auth/user/feed
const feeds = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
    const posts = await postModel
      .find()
      .populate("user", "firstName lastName username")
      .populate({
        path: "likes",
        model: "userAuths",
        select: "firstName lastName",
      })
      .populate("comments", "comment commentBy");
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.json(posts);
    }
  } else {
    res.status(400).json({ message: "User not authorized" });
  }
});
module.exports = {
  uploadPost,
  showPost,
  getPosts,
  deletePost,
  updatePost,
  feeds,
};
