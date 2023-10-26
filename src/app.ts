import express from "express";
import log from "./utils/logger/log";
import config from "./lib/config/default";
import createServer from "./utils/server";
import connect from "./lib/db/connect";
import { privateRoutes, publicRoutes } from "./routes";

const port = config.get("port") as number;

const api = express.Router();

const app = createServer();

connect();

app.use("/api/v1", api);

publicRoutes(api);  
// middleware for auth
privateRoutes(api);

app.listen(port, () => {
  log.info(`Server is listening on url http://localhost:${port}`);
});
