import { User } from "../../model";
import log from "../../utils/logger/log";

const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    log.error(JSON.stringify({ path: "Find User Email", error: error }));
    return null;
  }
};

const findUserByPhone = async (phone: string) => {
  try {
    const user = await User.findOne({ phone: phone });
    return user;
  } catch (error) {
    log.error(JSON.stringify({ path: "Find User By Phone", error: error }));
    return null;
  }
};

export { findUserByEmail, findUserByPhone };
