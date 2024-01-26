// Middleware for handling auth
const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const token = req.headers.authorization.slice(7);
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).send("Invalid jwt");
  }
}

module.exports = adminMiddleware;
