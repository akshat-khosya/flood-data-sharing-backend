import express from "express";
import { getUserProfile } from "../../controllers";

const accountPrivateRoutes = express.Router();

accountPrivateRoutes.get("/verify", getUserProfile);

export default accountPrivateRoutes;
