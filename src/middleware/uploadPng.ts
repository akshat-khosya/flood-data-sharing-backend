import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import config from "../lib/config/default";

const destination = config.get("dataPath") as string;
const storage = multer.diskStorage({
  destination: destination,
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + path.extname(file.originalname);
    req.imageName = uniqueFilename; // Pass the image name to the request object
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG files are allowed."));
    }
  },
});

export default upload;
