const mongoose = require("mongoose");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const User = mongoose.model("User");

  const existingUser = await User.findOne({ username });
  if (!existingUser) return res.status(404).send("User doesn't exist");
  if (existingUser.username !== username || existingUser.password !== password)
    return res.status(403).send("Invalid credentials for user");
  next();
}

module.exports = userMiddleware;
