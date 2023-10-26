import express from "express";
import { loginAccount, registerAccount } from "../../controllers";

const accountPublicRoutes = express.Router();

accountPublicRoutes.post("/register", registerAccount);

accountPublicRoutes.post("/login", loginAccount);

export default accountPublicRoutes;
