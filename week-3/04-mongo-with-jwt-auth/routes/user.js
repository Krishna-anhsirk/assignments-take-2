const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");

const jwtSecret = "secret";

const myUserSchema = zod.object({
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

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password, name } = req.body;

    myUserSchema.parse({ username, password, name });

    // If user username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).send("A user with this username already exists");
    }
    // Create user in db
    User.create({ username, name, password });

    return res.json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(422)
      .send("Invalid inputs, password should be at least of length 6");
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (!existingUser) return res.status(404).send("User doesn't exist");
  if (existingUser.password !== password)
    return res.status(401).send("Invalid login credentials");

  // Create jwt and send
  const token = jwt.sign({ username }, jwtSecret);
  return res.json({ token });
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});

  return res.json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;

  const course = await Course.findOne({ _id: courseId });
  if (!course) return res.status(404).send("Course not found");

  await User.updateOne(
    { username: req.body.username },
    {
      $push: { purchasedCourses: courseId },
    }
  );

  return res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({ username: req.body.username });
  const purchasedCourses = await Course.find({ _id: user.purchasedCourses });
  return res.json(purchasedCourses);
});

module.exports = router;
