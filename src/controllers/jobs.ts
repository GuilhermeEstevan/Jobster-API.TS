import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createJobService } from "../services/jobs/createJob";
import { IQueryParams, TJobResponse } from "../interfaces/job.interface";
import { getAllJobsService } from "../services/jobs/getAllJobs";
import { getSingleJobService } from "../services/jobs/getSingleJob";
import { deleteJobService } from "../services/jobs/deleteJob";
import { editJobService } from "../services/jobs/editJob";

const createJob = async (
  req: Request,
  res: Response
): Promise<Response<TJobResponse>> => {
  const { userId } = res.locals;
  const job = await createJobService(req.body, userId);
  console.log(job);

  return res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (
  req: Request,
  res: Response
): Promise<Response<TJobResponse[]>> => {
  const { userId } = res.locals;
  const query = req.query as IQueryParams
  const jobs = await getAllJobsService(userId, query);
  const totalJobs = jobs?.length;
  return res.status(StatusCodes.OK).json({ jobs, totalJobs });
};

// ID PARAMS

const getSingleJob = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;
  const { id: jobId } = req.params;
  const job = await getSingleJobService(userId, jobId);

  return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (
  req: Request,
  res: Response
): Promise<Response<void>> => {
  const { userId } = res.locals;
  const { id: jobId } = req.params;
  await deleteJobService(userId, jobId);

  return res.status(StatusCodes.OK).send();
};

const editJob = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = res.locals;
  const { id: jobId } = req.params;

  const job = await editJobService(req.body, userId, jobId);

  return res.status(StatusCodes.OK).json({ job });
};

export { createJob, getAllJobs, getSingleJob, deleteJob, editJob };
