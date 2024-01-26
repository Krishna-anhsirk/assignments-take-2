const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

mongoose.connect(
  "mongodb+srv://new-user_1:GcQRXAdswG6s9ZAt@cluster0.ngmkxch.mongodb.net/newuserapp?retryWrites=true&w=majority"
);

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
