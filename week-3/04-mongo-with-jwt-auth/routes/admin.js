const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");

const jwtSecret = "secret";

const myAdminSchema = zod.object({
  username: zod.string(),
  name: zod.string(),
  password: zod.string().min(6),
});

const myCourseSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  imageLink: zod.string(),
  price: zod.number(),
});

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password, name } = req.body;

    myAdminSchema.parse({ username, password, name });

    // If admin username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(403).send("This admin username already exists");
    }
    // Create admin in db
    Admin.create({ username, name, password });

    return res.json({ message: "Admin created successfully" });
  } catch (error) {
    return res
      .status(422)
      .send("Invalid inputs, password should be at least of length 6");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) return res.status(404).send("Admin doesn't exist");
  if (existingAdmin.password !== password)
    return res.status(401).send("Invalid login credentials");

  // Create jwt and send
  const token = jwt.sign({ username }, jwtSecret);
  return res.json({ token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const { title, description, price, imageLink } = req.body;

  const course = await Course.create({ title, description, price, imageLink });

  res.json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const courses = await Course.find({});

  return res.json(courses);
});

module.exports = router;
