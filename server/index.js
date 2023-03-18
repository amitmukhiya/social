const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fileURLToPath = require("url");
const User = require("./models/user");
const bodyParser = require("body-parser");

// const userRoute = require("./routes/users"); //"./routes/users"
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

// CONFIGURATION

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

// STORAGE SETUP

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  fileName: (req, res, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded");
  } catch (error) {
    console.log(error);
  }
});

// SERVER

// app.use("/api/users", userRoute);
app.use("/api", authRoute);
// app.use("/api/posts", postRoute);

app.post("/hello", (req, res) => {
  res.send("hello");
});

const PORT = process.env.SERVER_PORT || 6080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
