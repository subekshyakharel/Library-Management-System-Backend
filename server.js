import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

// connnect db
import { dbConnect } from "./src/config/dbConfig.js";

//Middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import bookRoute from "./src/routes/bookRoute.js";
import borrowRoute from "./src/routes/borrowRoute.js";
import reviewRoute from "./src/routes/reviewRoute.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/borrow", borrowRoute);
app.use("/api/v1/review", reviewRoute);

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
