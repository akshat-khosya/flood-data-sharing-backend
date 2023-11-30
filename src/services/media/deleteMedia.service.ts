import { Media } from "../../model/media.model";

const deleteSingleMedia = async (id: string) => {
  try {
    console.log(id);
    const res = await Media.findOneAndDelete({ imageName: id });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export { deleteSingleMedia };
