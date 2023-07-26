const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  profilepicture:{
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: { type: String, enum: ["Male", "Female"] },
  birthday: {
    type: Date,
    trim: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  relation: {
    type: String,
  },
  diagnose: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "userPosts" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "userAuths" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "userAuths" }],
});

module.exports = mongoose.model("userAuths", userSchema);
