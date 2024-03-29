import express from "express";
import cors from "cors";
import helmet from "helmet";

function createServer() {
  const app = express();

  const corsOptions = {
    origin: "http://localhost:3000", // Replace with the origin of your front-end application
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and HTTP authentication
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  /* health API to check if server is running*/
  app.get("/api/health", (req, res) => {
    res.status(200);
    res.send({
      time: new Date(),
      server: "Flood-Data-Sharing-backend",
      status: "Active",
    });
  });

  return app;
}

export default createServer;
