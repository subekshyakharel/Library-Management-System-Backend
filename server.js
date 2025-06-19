import express from "express";
const app = express();
const PORT = process.env.PORT || 8001;

// connnect db
import { dbConnect } from "./src/config/dbConfig.js";

//Middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

//server status
import { responseClient } from "./src/middlewares/responseClient.js";
app.get("/", (req, res) => {
  const message = "server is live";
  responseClient({ req, res, message });
});

import { errorHandler } from "./src/middlewares/errorHandler.js";
app.use(errorHandler);

dbConnect()
  .then(() =>
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log("Server is running at http://localhost:" + PORT);
    })
  )
  .catch((error) => console.log(error));
