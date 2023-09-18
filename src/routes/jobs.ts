import { Router } from "express";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getSingleJob,
} from "../controllers/jobs";
const jobsRoutes = Router();

jobsRoutes.route("/").post(createJob).get(getAllJobs);
jobsRoutes.route("/:id").get(getSingleJob).delete(deleteJob).patch(editJob);

export default jobsRoutes;
