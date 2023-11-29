import express from "express";
import { upload } from "../../middleware";
import { createMediaHandler, uploadMediaPng } from "../../controllers";
import { getUserAllMediaHandler } from "../../controllers/media";
import { getAllMediaHandler } from "../../controllers/media/getMedia.controller";

const mediaPrivateRoute = express.Router();

// upload png
mediaPrivateRoute.post("/upload", upload.single("image"), uploadMediaPng);

// create media data
mediaPrivateRoute.post("/create", createMediaHandler);

// get user all media
mediaPrivateRoute.get("/user", getUserAllMediaHandler);

// get all media
mediaPrivateRoute.get("/", getAllMediaHandler);

export default mediaPrivateRoute;
