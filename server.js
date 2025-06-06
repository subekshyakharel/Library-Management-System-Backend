import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//Middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Server is running at http://localhost:" + PORT);
});
