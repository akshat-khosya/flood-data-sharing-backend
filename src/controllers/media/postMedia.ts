import { Request, Response } from "express";
const fs = require("fs");
import log from "../../utils/logger/log";
import config from "../../lib/config/default";
import { createMedia } from "../../services";

const mediaDestination = config.get("dataPath") as string;

const uploadMediaPng = async (req: Request, res: Response) => {
  try {
    const imageName = req.imageName;
    // check for image name
    if (!imageName) {
      return res.status(500).json({ status: false, msg: "Unable to Upload" });
    }
    // req django for image verfication

    // Respond to user

    return res
      .status(200)
      .json({ status: true, msg: "Image Uploaded Succesfully", imageName });
  } catch (error) {
    log.error(JSON.stringify({ path: "Upload Media", error: error }));
    return res.status(500).json({ status: false, msg: error.message });
  }
};

const createMediaHandler = async (req: Request, res: Response) => {
  try {
    // check image
    const imagePath = mediaDestination + "/" + req.body.imageName;
    if (!fs.existsSync(imagePath)) {
      return res.status(401).json({ status: false, msg: "No Image found" });
    }

    // create Media
    const data = await createMedia({
      userId: req.userId,
      imageName: req.body.imageName,
      mediaType: req.body.mediaType,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });
    return res.status(200).json({
      status: true,
      msg: "Image Uploaded Succesfully",
      mediaId: data.id,
    });
  } catch (error) {
    log.error(JSON.stringify({ path: "Upload Media", error: error.message }));
    return res.status(500).json({ status: false, msg: error.message });
  }
};

export { uploadMediaPng, createMediaHandler };
