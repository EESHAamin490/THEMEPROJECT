const asyncHandler = require("express-async-handler");

// * GET Request
// * Get /auth/admin/totallikes
const getLikes = asyncHandler(async (req, res) => {});

module.exports = {
  getLikes,
};
