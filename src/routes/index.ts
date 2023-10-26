import { Router } from "express";
import { accountPublicRoutes } from "./accounts";

const publicRoutes = (api: Router) => {
  api.use("/account", accountPublicRoutes);
};

const privateRoutes = (api: Router) => {};

export { privateRoutes, publicRoutes };
