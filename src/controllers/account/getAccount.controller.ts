import { Request, Response } from "express";
import log from "../../utils/logger/log";
import { findUserById } from "../../services";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userData = await findUserById(req.userId);
    return res.status(200).json({ status: true, user: userData });
  } catch (error) {
    log.error(
      JSON.stringify({ path: "Register Account", error: error.message })
    );
    return res.status(500).json({ status: false, msg: error.message });
  }
};

export { getUserProfile };
