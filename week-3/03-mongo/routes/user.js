const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require("zod");
const mongoose = require("mongoose");

const myUserSchema = zod.object({
  username: zod.string(),
  name: zod.string(),
  password: zod.string().min(6),
});

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

const Course = mongoose.model("Course");

const Purchase = mongoose.model("Purchase", {
  username: String,
  courseId: Number,
});

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password, name } = req.body;
    myUserSchema.parse({
      username,
      name,
      password,
    });
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).send("User already exists");
    } else {
      const newUser = new User({
        username,
        password,
        name,
      });
      newUser.save();
      res.json({ msg: "User created successfull" });
    }
  } catch (error) {
    return res
      .status(422)
      .send(
        "Invalid input values, password should be min 6 characters lengthy"
      );
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  return res.json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const { username } = req.headers;
  const course = await Course.findOne({ id: courseId });
  if (!course) return res.status(404).send("Course not found");
  const isPurchasedCourse = await Purchase.findOne({ courseId, username });
  if (isPurchasedCourse)
    return res.status(409).send("You already purchased this course");
  const newPurchase = new Purchase({
    username,
    courseId: course.id,
  });
  newPurchase.save();
  return res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const purchasedCourses = await Purchase.find({
    username: req.headers.username,
  });
  if (purchasedCourses) return res.json(purchasedCourses);
  return res.json({ message: "You have not purchased any course" });
});

module.exports = router;
