import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";

import AuthRoute from "./routes/auth.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "./Images");
  },
  filename: function (request, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static("./"));
app.use("/api/auth", upload.single("profilePic"), AuthRoute);

mongoose
  .connect(MONGODB_URL)
  .then(
    app.listen(PORT, () => {
      console.log(
        `MongoDB database connected and server is listening on ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(error);
  });
