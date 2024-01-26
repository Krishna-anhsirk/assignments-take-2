const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.verify(token, jwtSecret);
    req.body.username = decoded.username;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).send("Invalid jwt");
  }
}

module.exports = userMiddleware;
