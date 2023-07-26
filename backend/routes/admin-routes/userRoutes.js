const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginUser,
  loggedInuser,
  userList,
  getUser,
  deleteUser,
} = require("../../controllers/admin-controllers/userController");
const {
  getPosts,
  showPost,
  deletePost,
} = require("../../controllers/admin-controllers/postController");
const {
  deleteComment,
  getComments,
  getComment,
} = require("../../controllers/admin-controllers/commentController");
const { adminProtect } = require("../../middleware/authMiddleware");

// ? Authentication Routes
router.post("/admin/login", loginUser);
router.get("/admin/me", adminProtect, loggedInuser);
router.post("/admin/register", registerAdmin);

// ? User Lists Dashboard
router.get("/admin/userList", userList);
router.get("/admin/user/:id", adminProtect, getUser);
router.delete("/admin/user/:id", adminProtect, deleteUser);

// ? Posts Routes
router.get("/admin/posts", adminProtect, getPosts);
router.get("/admin/post/:id", adminProtect, showPost);
router.delete("/admin/post/:id", adminProtect, deletePost);

// ? Commenting on Post Routes as a user
router.get("/admin/postcomments", adminProtect, getComments);
router.get("/admin/post/comment/:id", adminProtect, getComment);
router.delete("/admin/post/comment/:id", adminProtect, deleteComment);

module.exports = router;
