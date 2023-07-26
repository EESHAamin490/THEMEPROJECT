const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please add a First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a Last Name"],
  },
  gender: { type: String, enum: ["Male", "Female"] },
  birthday: {
    type: Date,
    required: [true, "Please add Date of Birth"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an Email"],
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please add a contact number"],
  },
  city: {
    type: String,
    required: [true, "Please add a city name"],
  }
});

module.exports = mongoose.model("adminAuths", userSchema);
