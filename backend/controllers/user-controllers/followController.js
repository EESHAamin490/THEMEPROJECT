const fs = require("fs");
const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user-models/userModel");
const postModel = require("../../models/user-models/postModel");
const adminModel = require("../../models/admin-models/userModel");

// * POST Request
// * Post /auth/user/follow
const followUser = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const { followUserId } = req.body;
  // Check if both user IDs are provided
  if (!followUserId) {
    return res.status(400).json({ error: "Follow User ID is required." });
  } else {
    const user = await userModel.findById(req.user.id);
    if (user) {
      const followUser = await userModel.findById(followUserId);
      if (!followUser) {
        return res.status(404).json({ error: "User to follow not found." });
      } else {
        // ? Check if the user is already following the other user
        if (user.following.includes(followUserId)) {
          return res
            .status(400)
            .json({ error: "User is already following this user." });
        } else {
          // ? Add the followUser's ID to the user's following array
          user.following.push(followUserId);
          // ?Add the user's ID to the followUser's followers array
          followUser.followers.push(req.user.id);
          user.save();
          followUser.save();
          res.json({ user: user.following, followed: followUser.followers });
        }
      }
    } else {
      res.status(400).json({ message: "User not authorized" });
    }
  }
});

// * POST Request
// * Post /auth/user/unfollow
const unfollowUser = asyncHandler(async (req, res) => {
  const admin = await adminModel.findOne();
  const { unfollowUserId } = req.body;
  // Check if both user IDs are provided
  if (!unfollowUserId) {
    return res.status(400).json({ error: "unFollow User ID is required." });
  } else {
    const user = await userModel.findById(req.user.id);
    if (user) {
      const unfollowUser = await userModel.findById(unfollowUserId);
      if (!unfollowUser) {
        return res.status(404).json({ error: "User to unfollow not found." });
      } else {
        // ? Check if the user is already following the other user
        if (user.following.includes(unfollowUserId)) {
          return res
            .status(400)
            .json({ error: "User is not following this user." });
        } else {
          // ? Remove the unfollowUser's ID from the user's following array
          user.following = user.following.filter(
            (id) => id.toString() !== unfollowUserId
          );

          // ?Remove the user's ID from the unfollowUser's followers array
          unfollowUser.followers = unfollowUser.followers.filter(
            (id) => id.toString() !== req.user.id
          );
          user.save();
          followUser.save();
          res.json({ user: user.following, followed: followUser.follower });
        }
      }
    } else {
      res.status(400).json({ message: "User not authorized" });
    }
  }
});



// * GET Request
// * Get /auth/user/followers
const getfollowers = asyncHandler(async (req, res) => {
    const admin = await adminModel.findOne();
    const { unfollowUserId } = req.body;
    // Check if both user IDs are provided
    if (!unfollowUserId) {
      return res.status(400).json({ error: "unFollow User ID is required." });
    } else {
      const user = await userModel.findById(req.user.id);
      if (user) {
        const unfollowUser = await userModel.findById(unfollowUserId);
        if (!unfollowUser) {
          return res.status(404).json({ error: "User to unfollow not found." });
        } else {
          // ? Check if the user is already following the other user
          if (user.following.includes(unfollowUserId)) {
            return res
              .status(400)
              .json({ error: "User is not following this user." });
          } else {
            // ? Remove the unfollowUser's ID from the user's following array
            user.following = user.following.filter(
              (id) => id.toString() !== unfollowUserId
            );
  
            // ?Remove the user's ID from the unfollowUser's followers array
            unfollowUser.followers = unfollowUser.followers.filter(
              (id) => id.toString() !== req.user.id
            );
            user.save();
            followUser.save();
            res.json({ user: user.following, followed: followUser.follower });
          }
        }
      } else {
        res.status(400).json({ message: "User not authorized" });
      }
    }
  });
  
// * GET Request
// * Get /auth/user/following
const getfollowing = asyncHandler(async (req, res) => {
    const admin = await adminModel.findOne();
    const { unfollowUserId } = req.body;
    // Check if both user IDs are provided
    if (!unfollowUserId) {
      return res.status(400).json({ error: "unFollow User ID is required." });
    } else {
      const user = await userModel.findById(req.user.id);
      if (user) {
        const unfollowUser = await userModel.findById(unfollowUserId);
        if (!unfollowUser) {
          return res.status(404).json({ error: "User to unfollow not found." });
        } else {
          // ? Check if the user is already following the other user
          if (user.following.includes(unfollowUserId)) {
            return res
              .status(400)
              .json({ error: "User is not following this user." });
          } else {
            // ? Remove the unfollowUser's ID from the user's following array
            user.following = user.following.filter(
              (id) => id.toString() !== unfollowUserId
            );
  
            // ?Remove the user's ID from the unfollowUser's followers array
            unfollowUser.followers = unfollowUser.followers.filter(
              (id) => id.toString() !== req.user.id
            );
            user.save();
            followUser.save();
            res.json({ user: user.following, followed: followUser.follower });
          }
        }
      } else {
        res.status(400).json({ message: "User not authorized" });
      }
    }
  });
  module.exports = { followUser, unfollowUser,getfollowers,getfollowing };
