import * as os from "os";
import log from "./utils/logger/log";
import config from "./lib/config/default";
import createServer from "./utils/server";
import connect from "./lib/db/connect";

const port = config.get("port") as number;

const ipAddress = os.networkInterfaces().wlan0[0].address;

const app = createServer();

connect();

app.listen(port, () => {
  log.info(`Server is listening on url http://${ipAddress}:
  ${port}`);
});
