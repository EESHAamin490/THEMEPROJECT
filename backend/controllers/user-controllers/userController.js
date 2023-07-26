const asyncHandler = require("express-async-handler");
const userModel = require("../../models/user-models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/errorMiddleware");
const adminModel = require("../../models/admin-models/userModel");

// * POST Request
// * Post /auth/user/register
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    birthday,
    email,
    city,
    password,
    contactNumber,
  } = req.body;

  if (
    !(
      firstName ||
      lastName ||
      gender ||
      birthday ||
      email ||
      password ||
      city ||
      contactNumber
    )
  ) {
    res.status(400).json("ERROR: Please Add all the field");
    throw new Error("Please Add all the field");
  }

  // ? Check if user Exist
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(400).json("User already exists");
    throw new Error("User already exists");
  }
  const getAdmin = await adminModel.findOne();
  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ? Create User/ Register User
  const user = await userModel.create({
    firstName,
    lastName,
    gender,
    birthday,
    email,
    city,
    password: hashedPassword,
    contactNumber,
    admin: getAdmin.id,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      gender: user.gender,
      birthday: user.birthday,
      email: user.email,
      contactNumber: user.contactNumber,
    });
  } else {
    res.status(400).json("Invalid User Data");
    throw new Error("Invalid User Data");
  }
});

// * POST Request
// * Post /auth/employee/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ? Check for User Email
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Invalid User Credentials");
    throw new Error("Invalid User Credentials");
  }
});

// * POST Request
// * Post /auth/user/:id/addUsername
const addUsername = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(400).json({ message: "User not authorized" });
  } else {
    const { username } = req.body;
    const isExist = await userModel.findOne({ username: username });
    if (isExist) {
      res.json("Username already exist");
    } else {
      const addUsername = await userModel.findByIdAndUpdate(req.params.id, {
        username,
      });
      const getData = await userModel.findById(req.params.id);
      res.status(201).json({ message: "username added successfuly", getData });
    }
  }
});

// * GET Request
// * Get /auth/employee/me
const loggedInuser = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    gender,
    relation,
    diagnose,
    role,
    birthday,
    email,
    username,
    contactNumber,
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    city,
    zipcode,
    social,
  } = await userModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    gender,
    role,
    birthday,
    relation,
    diagnose,
    email,
    contactNumber,
    companyName,
    companyURL,
    username,
    branchName,
    totalEmployees,
    city,
    zipcode,
    social,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const getUser = await userModel.findById(req.params.id);
  if (!getUser) {
    res.status(400).json("User not found");
    throw new Error("User not found");
  }
  const {
    firstName,
    lastName,
    gender,
    birthday,
    city,
    email,
    password,
    contactNumber,
  } = req.body;

  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    gender,
    city,
    birthday,
    email,
    password: hashedPassword,
    contactNumber,
  });
  const getData = await userModel.findById(req.params.id);
  res.status(200).json(getData);
});

// * POST Request
// * Post /auth/user/:id/addRelationship
const addRelationship = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "User not authorized" });
  } else {
    const { relation } = req.body;
    const addRelation = await userModel.findByIdAndUpdate(req.params.id, {
      relation,
    });
    const getData = await userModel.findById(req.params.id);
    res.status(201).json({ message: "Relation added successfuly", getData });
  }
});
// * PUT Request
// * Put /auth/user/addDiagnose/:id
const addDiagnose = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "User not authorized" });
  } else {
    const { diagnose } = req.body;
    const addDiagnose = await userModel.findByIdAndUpdate(req.params.id, {
      diagnose,
    });
    const getData = await userModel.findById(req.params.id);
    res.status(201).json({ message: "Diagnose added successfuly", getData });
  }
});
// * Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  updateUser,
  loggedInuser,
  loginUser,
  addUsername,
  addDiagnose,
  addRelationship,
};
