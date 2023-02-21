import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; //ALLOW US TO SET PATHS WHEN WE CONFIGURE DIRECTORIES
import helmet from "helmet";
import { registerUser } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/Users.js";
import Post from "./models/Posts.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATION */
dotenv.config(); // load the environment variables

const __filename = fileURLToPath(import.meta.url); // grab the file url
const __dirname = path.dirname(__filename); // grab the directory name

const app = express(); // create express app
app.use(express.json()); // parse json data
app.use(helmet()); // secure the app by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // set the cross-origin resource policy
app.use(morgan("dev")); // log requests to the console
app.use(bodyParser.json({ limit: "30mb", extended: true })); // parse json data
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // parse urlencoded data
app.use(cors()); // allow cross-origin requests
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // serve static files into assets folder (images, videos, etc)

/* FILE STORAGE */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets"); // set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // set the file name
  },
}); // create a storage object

const upload = multer({ storage: storage }); // create a multer object with the storage object for us to save files

/* ROUTES WITH FILES*/
app.post("/auth/register", upload.single("image"), registerUser); // register route with file
app.post("/posts", verifyToken, upload.single("image"), createPost); // create post route with file

/* ROUTES*/
app.use("/auth", authRoutes); // auth routes
app.use("/users", userRoutes); // user routes
app.use("/posts", postRoutes); // post routes

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // set the port

mongoose.set("strictQuery", true); // set strict query to true
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    }); // start the server
    // User.insertMany(users); // insert the users and posts into the database
    // Post.insertMany(posts); // insert the users and posts into the database
  })
  .catch((e) => {
    console.log(e.message);
  }); // connect to the database and start the server
