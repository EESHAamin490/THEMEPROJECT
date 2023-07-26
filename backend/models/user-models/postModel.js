const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  filename: {
    type: String,
  },
  path: {
    type: String,
  },
  caption: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "userAuths",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "adminAuths",
  }, likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userAuths" }],
 
});

module.exports = mongoose.model("userPosts", postSchema);
