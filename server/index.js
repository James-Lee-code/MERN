const express = require("express");
const path = require("path");          
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
require("./config/passport")(passport);

const cors = require("cors");

const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());


app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);


app.use(express.static(path.join(__dirname, "../client/build")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("連結到 MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB 連線錯誤：", error);
  });
