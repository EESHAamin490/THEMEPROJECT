const express = require("express");
const {
  unLikePost,
  likePost,
} = require("../../controllers/user-controllers/likeController");
const router = express.Router();
const {
  loginUser,
  loggedInuser,
  updateUser,
  registerUser,
  addUsername,
  addRelationship,
  addDiagnose,
} = require("../../controllers/user-controllers/userController");
const {
  uploadPost,
  showPost,
  getPosts,
  deletePost,
  updatePost,
  feeds,
} = require("../../controllers/user-controllers/postController");
const {
  commenting,
  deleteComment,
  getComments,
  getComment,
} = require("../../controllers/user-controllers/commentController");
const { userProtect } = require("../../middleware/authMiddleware");
const { upload } = require("../../middleware/fileUploadMiddleware");
const {
  followUser,
  unfollowUser,
  getfollowers,
  getfollowing,
} = require("../../controllers/user-controllers/followController");

// ? Authentication
router.post("/user/signup", registerUser);
router.post("/user/login", loginUser);
router.get("/user/me", userProtect, loggedInuser);

// ? Adding Username
router.put("/user/addUsername/:id", userProtect, addUsername);

// ? Adding Relation
router.put("/user/addRelation/:id", userProtect, addRelationship);
// ? Adding Diagnose
router.put("/user/addDiagnose/:id", userProtect, addDiagnose);
// ? Update User Information
router.put("/user/updateData/:id", userProtect, updateUser);

// ? Posts Routes
router.post("/user/post/upload", userProtect, upload.single("post"), uploadPost);
router.get("/user/posts", userProtect, getPosts);
router.get("/user/post/:id", userProtect, showPost);
router.delete("/user/post/:id", userProtect, deletePost);
router.put("/user/post/:id", userProtect, updatePost);
router.get("/user/timeline", userProtect, feeds); // ? Timeline post/feed

//? User Routes

// ? Commenting on Post Routes as a user
router.post("/user/post/", userProtect, commenting);
router.get("/user/postcomments/:id", userProtect, getComments);
router.get("/user/post/comment/:id", userProtect, getComment);
router.delete("/user/post/comment/:id", userProtect, deleteComment);

// ? Follow Routes
router.post("/user/follow", userProtect, followUser);
router.post("/user/unfollow", userProtect, unfollowUser);
router.get("/user/followers", userProtect, getfollowers);
router.get("/user/following", userProtect, getfollowing);
 
// ? Likes Routes
router.post("/user/post/like", userProtect, likePost);
router.post("/user/post/unlike", userProtect, unLikePost);
module.exports = router;
