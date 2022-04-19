import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { MONGO_URL, PORT } from "./config/env";

import * as dotenv from "dotenv";
dotenv.config();

// Database
import connect from "./config/connect";
connect(MONGO_URL);

const app: Application = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/", (_, res) => res.send("API server is running"));

app.use(
  "/",
  function (req: Request, res: Response, next) {
    // const forwarded =
    //   req.headers["x-real-ip"] ||
    //   req.connection?.remoteAddress?.replace(/:|f/g, "");

    // req.forwarded = forwarded;

    next();
  },
  routes
);
// server
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
