const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "userAuths",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "userPosts",
  },
  comment: {
    type: String,
  },
  commentBy: {
    type: String,
  },

  commentTo: {
    type: String,
  },
  commenterId: {
    type: Schema.Types.ObjectId,
    ref: "userAuths",
  },
});

module.exports = mongoose.model("comments", commentSchema);
