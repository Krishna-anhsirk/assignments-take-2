const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const mongoose = require("mongoose");
const router = Router();
const zod = require("zod");

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

const Admin = mongoose.model("Admin", {
  name: String,
  username: String,
  password: String,
});

const Course = mongoose.model("Course", {
  id: Number,
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password, name } = req.body;
    myAdminSchema.parse({
      username,
      name,
      password,
    });
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      res.status(409).send("Admin already exists");
    } else {
      const newAdmin = new Admin({
        username,
        password,
        name,
      });
      newAdmin.save();
      res.json({ msg: "Admin created successfull" });
    }
  } catch (error) {
    return res
      .status(422)
      .send(
        "Invalid input values, password should be min 6 characters lengthy"
      );
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const { title, description, price, imageLink } = req.body;
    myCourseSchema.parse({ title, description, price, imageLink });
    const courseCount = await Course.countDocuments();
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) return res.status(409).send("Course already exists");
    const newCourse = new Course({
      id: courseCount,
      title,
      description,
      price,
      imageLink,
    });
    newCourse.save();
    res.json({
      message: "Course created successfully",
      courseId: courseCount,
    });
  } catch (error) {
    return res.status(422).send("Invalid course details");
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  return res.json(courses);
});

module.exports = router;
