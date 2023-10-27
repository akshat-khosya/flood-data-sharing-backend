import express from "express";
import { upload } from "../../middleware";
import { createMediaHandler, uploadMediaPng } from "../../controllers";

const mediaPrivateRoute = express.Router();

// upload png
mediaPrivateRoute.post("/upload", upload.single("image"), uploadMediaPng);

// create media data
mediaPrivateRoute.post("/create", createMediaHandler);

export default mediaPrivateRoute;
