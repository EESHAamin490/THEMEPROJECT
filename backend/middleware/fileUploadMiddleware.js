const multer = require("multer");

// ? upload middleware
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const upload = multer({ storage, fileFilter });
module.exports = { upload };
