const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/errorMiddleware");
const userModel = require("../../models/user-models/userModel");

// * POST Request
// * Post /auth/admin/register
const registerAdmin = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    birthday,
    email,
    password,
    contactNumber,
    city,
  } = req.body;

  if (
    !(
      firstName ||
      lastName ||
      gender ||
      birthday ||
      email ||
      password ||
      contactNumber ||
      city
    )
  ) {
    res.status(400).json("ERROR: Please Add all the field");
    throw new Error("Please Add all the field");
  }

  // ? Check if user Exist
  const userExist = await adminModel.findOne({ email });
  if (userExist) {
    res.status(400).json("User already exists");
    throw new Error("User already exists");
  }

  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ? Create User/ Register User
  const user = await adminModel.create({
    firstName,
    lastName,
    gender,
    birthday,
    email,
    password: hashedPassword,
    contactNumber,
    city,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthday: user.birthday,
      email: user.email,
      contactNumber: user.contactNumber,
      city: user.city,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUserData = asyncHandler(async (req, res) => {});

// * POST Request
// * Post /auth/admin/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ? Check for User Email
  const user = await adminModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("ERROR: Invalid User Credentials");
    throw new Error("Invalid User Credentials");
  }
});

// * GET Request
// * Get /auth/admin/me
const loggedInuser = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    username,
    lastName,
    birthday,
    gender,
    email,
    contactNumber,
    city,
  } = await adminModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    gender,
    username,
    birthday,
    email,
    contactNumber,
    city,
  });
});

// * Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

// ! Users Details
const userList = asyncHandler(async (req, res) => {
  const getList = await userModel.find();
  res.status(201).json(getList);
});

// * GET Request
// * Get /auth/admin/user/id;
const getUser = asyncHandler(async (req, res) => {
  const getUser = await userModel.findById((admin = req.params.id));
  res.status(200).json(getUser);
});

// * DELETE Request
// * Delete / auth/admin/user/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(400).json("User not found");
    throw new Error("User not found");
  }
  const admin = await adminModel.findOne();
  // * check for user
  if (!admin) {
    res.status(401).json("User not found");
    throw new Error("User not found");
  }
  // * Make sure the logged in user matches to authentication
  if (admin.id === user.admin) {
    res.status(401).json("User not authorized");
    throw new Error("User not authorized");
  }
  user.remove();
  res.status(200).json({ id: req.params.id, message: "Deleted User" });
});
module.exports = {
  registerAdmin,
  loggedInuser,
  loginUser,
  userList,
  getUser,
  deleteUser
};
