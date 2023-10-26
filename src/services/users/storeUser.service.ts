import { IUser, User } from "../../model/user.model";
import log from "../../utils/logger/log";

const createUser = async (userData: IUser) => {
  try {
    await User.create(userData);
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createUser };
