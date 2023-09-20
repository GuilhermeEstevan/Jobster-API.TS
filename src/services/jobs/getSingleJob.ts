import { NotFound } from "../../errors";
import { TJobResponse } from "../../interfaces/job.interface";
import JobsModel from "../../models/jobs";

const getSingleJobService = async (
  userId: string,
  jobId: string
): Promise<TJobResponse | null> => {
  const job = await JobsModel.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  return job;
};

export { getSingleJobService };
