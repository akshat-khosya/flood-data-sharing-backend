import { Router } from "express";
import { accountPublicRoutes } from "./accounts";
import { mediaPrivateRoute } from "./media";
import { deserializeUser } from "../middleware";

const publicRoutes = (api: Router) => {
  api.use("/account", accountPublicRoutes);
};

const privateRoutes = (api: Router) => {
  api.use("/media", deserializeUser, mediaPrivateRoute);
};

export { privateRoutes, publicRoutes };
