const express = require("express");
const mongoose = require("mongoose");
const { URL } = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 9000;
const multer = require("multer");
const app = express();
const path = require("path");
const fs = require("fs");

const admin = {
  auth: require("./routes/admin-routes/userRoutes"),
};
const user = {
  auth: require("./routes/user-routes/userRoutes"),
};

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// ? PORT Ruuning on F 9000
app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
// ? Database Connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(URL);
    console.log(
      `MongoDB Connected: ${conn.connection.host} and URL is: ${URL}`
    );
  } catch (error) {
    console.log(error);
  }
};
connectDB(); //? DB Call

// * Admin Routes
app.use("/auth", admin.auth);

// * Employee Routes

app.use("/auth/", user.auth);
