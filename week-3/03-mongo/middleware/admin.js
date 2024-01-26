const mongoose = require("mongoose");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const Admin = mongoose.model("Admin");

  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) return res.status(404).send("Admin doesn't exist");
  if (
    existingAdmin.username !== username ||
    existingAdmin.password !== password
  )
    return res.status(403).send("Invalid credentials for admin");
  next();
}

module.exports = adminMiddleware;
