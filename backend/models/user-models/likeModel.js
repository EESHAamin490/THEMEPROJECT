const mongoose = require("mongoose");
const { Schema } = mongoose;
const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userAuths",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  liked: {
    type: Schema.Types.ObjectId,
    ref: "userAuths",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "userPosts",
  },
});

module.exports = mongoose.model("likes", likeSchema);
