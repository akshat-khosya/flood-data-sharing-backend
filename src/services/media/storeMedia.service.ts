import { IMedia, Media } from "../../model/media.model";

const createMedia = async (mediaData: IMedia) => {
  try {
    const res = await Media.create(mediaData);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export { createMedia };
