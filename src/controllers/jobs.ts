import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JobsModel from "../models/jobs";
import Unauthenticated from "../errors/unauthenticated";
import { NotFound } from "../errors/notFound";
import BadRequestError from "../errors/badRequest";

interface CustomRequest extends Request {
  user?: {
    userId: string;
    name: string;
  };
}

const createJob = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  req.body.createdBy = req.user?.userId;
  const newJob = await JobsModel.create(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "created job", job: newJob });
};

const getAllJobs = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  if (!req.user) throw new Unauthenticated("Authentication invalid!");

  const { userId } = req.user;

  const jobs = await JobsModel.find({ createdBy: userId }).sort("createdAt");
  return res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length });
};

// ID PARAMS

const getSingleJob = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  if (!req.user) throw new Unauthenticated("Authentication invalid!");

  const { userId } = req.user;
  const { id: jobId } = req.params;
  const job = await JobsModel.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  return res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  if (!req.user) throw new Unauthenticated("Authentication invalid!");

  const { userId } = req.user;
  const { id: jobId } = req.params;
  const jobToDelete = await JobsModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!jobToDelete) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "job deleted", jobToDelete });
};

const editJob = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  if (!req.user) throw new Unauthenticated("Authentication invalid!");

  const { userId } = req.user;
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  if (position === "" || company === "") {
    throw new BadRequestError("Please provide position and company");
  }

  const jobToEdit = await JobsModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(StatusCodes.OK).json({ message: "edit job", jobToEdit });
};

export { createJob, getAllJobs, getSingleJob, deleteJob, editJob };
