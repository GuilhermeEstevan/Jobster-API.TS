import "express-async-errors";
import express, { Application } from "express";
import usersRoutes from "./routes/users";
import dotenv from "dotenv";
import { handleErrors } from "./middleware";
import jobsRoutes from "./routes/jobs";
import authorizationMiddleware from "./middleware/authorization";
import { noRoutes } from "./middleware/noRoutes";
import cors from "cors";
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/jobs", authorizationMiddleware, jobsRoutes);

app.use(noRoutes);
app.use(handleErrors);

export default app;
