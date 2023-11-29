import { Request, Response } from "express";
import log from "../../utils/logger/log";
import { getAllMedia, getUserAllMedia } from "../../services";

// get a user all Media Data
// get all users Media Data
// get a media

const getUserAllMediaHandler = async (req: Request, res: Response) => {
  try {
    const allMediaData = await getUserAllMedia(req.userId);

    if (!allMediaData.length) {
      return res.status(401).json({ status: false, msg: "No Data found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "Array of Data", mediaData: allMediaData });
  } catch (error) {
    log.error(
      JSON.stringify({ path: "Get User All Media", error: error.message })
    );
    return res.status(500).json({ status: false, msg: error.message });
  }
};
const getAllMediaHandler = async (req: Request, res: Response) => {
  try {
    const mediaData = await getAllMedia();

    if (!mediaData.length) {
      return res.status(401).json({ status: false, msg: "No Data found" });
    }
    return res
      .status(200)
      .json({ status: true, msg: "Array of Data", mediaData: mediaData });
  } catch (error) {
    log.error(
      JSON.stringify({ path: "Get User All Media", error: error.message })
    );
    return res.status(500).json({ status: false, msg: error.message });
  }
};
export { getUserAllMediaHandler, getAllMediaHandler };
