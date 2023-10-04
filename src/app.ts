import "express-async-errors";
import express, { Application } from "express";
import usersRoutes from "./routes/users";
import dotenv from "dotenv";
import { handleErrors } from "./middleware";
import jobsRoutes from "./routes/jobs";
import authorizationMiddleware from "./middleware/authorization";
import { noRoutes } from "./middleware/noRoutes";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

const app: Application = express();
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "https://jobster-ts.netlify.app/",
      "https://jobster-api-ydds.onrender.com",
      "http://localhost:5173",
    ],
    optionsSuccessStatus: 200,
  })
);
app.options("*", cors());

// HELMET
app.use(helmet());

// DOCS LINK
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/docs-api">Documentation</a>');
});

// Routes
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/jobs", authorizationMiddleware, jobsRoutes);

app.use(noRoutes);
app.use(handleErrors);

export default app;
