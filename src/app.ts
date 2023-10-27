import express from "express";
import log from "./utils/logger/log";
import config from "./lib/config/default";
import createServer from "./utils/server";
import connect from "./lib/db/connect";
import { privateRoutes, publicRoutes } from "./routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;

const api = express.Router();

const app = createServer();

const destination = config.get("dataPath") as string;

connect();

app.use("/data", express.static(destination));

app.use("/api/v1", api);

publicRoutes(api);
// middleware for auth
//app.use(deserializeUser);
privateRoutes(api);

app.listen(port, () => {
  log.info(`Server is listening on url http://localhost:${port}`);
});
