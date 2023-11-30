import mongoose from "mongoose";
import { Media } from "../../model/media.model";

const getUserAllMedia = async (userId: mongoose.Types.ObjectId) => {
  try {
    const res = await Media.find({ userId: userId }).sort({ createdAt: -1 });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
const getAllMedia = async () => {
  try {
    const res = await Media.find();
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
export { getUserAllMedia, getAllMedia };
