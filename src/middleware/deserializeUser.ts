import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt";
import mongoose from "mongoose";
import log from "../utils/logger/log";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers["x-access-token"] as string;
    if (!accessToken) {
      return res.sendStatus(403);
    }
    const { decoded, expired } = decode(accessToken);
    if (expired) {
      return res.sendStatus(403);
    }
    if (decoded) {
      const userId = decoded.userId as mongoose.Types.ObjectId;

      req.userId = userId;
      return next();
    }
    return res.sendStatus(403);
  } catch (error) {
    log.error(JSON.stringify({ path: "Deserialize User", error: error }));
    return res.sendStatus(403);
  }
};

export default deserializeUser;
