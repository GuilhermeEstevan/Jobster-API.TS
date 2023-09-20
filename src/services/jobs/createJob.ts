import { Types } from "mongoose";
import { TJobRequest, TJobResponse } from "../../interfaces/job.interface";
import JobsModel from "../../models/jobs";

const createJobService = async (
  Data: TJobRequest,
  userId: string
): Promise<TJobResponse> => {
  const job = await JobsModel.create({ ...Data, createdBy: userId });
  return job;
};

export { createJobService };
