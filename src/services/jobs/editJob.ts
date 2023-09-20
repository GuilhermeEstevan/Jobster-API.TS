import { BadRequestError, NotFound } from "../../errors";
import { TJobRequest, TJobResponse } from "../../interfaces/job.interface";
import JobsModel from "../../models/jobs";

const editJobService = async (
  Data: TJobRequest,
  userId: string,
  jobId: string
): Promise<TJobResponse | null> => {
  if (Data.company === "" || Data.position === "") {
    throw new BadRequestError("Please provide company and position");
  }

  const job = await JobsModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    Data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  return job;
};

export { editJobService };
