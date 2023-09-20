import { NotFound } from "../../errors";
import JobsModel from "../../models/jobs";

const deleteJobService = async (
  userId: string,
  jobId: string
): Promise<void> => {
  const job = await JobsModel.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }
};

export { deleteJobService };
