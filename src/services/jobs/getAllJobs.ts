import { Types } from "mongoose";
import {
  IQueryParams,
  TJobResponse,
  TQueryObject,
} from "../../interfaces/job.interface";
import JobsModel from "../../models/jobs";

const getAllJobsService = async (
  userId: string,
  query: IQueryParams
): Promise<TJobResponse[] | null> => {
  const { search, status, jobType, sort } = query;

  const queryObject: TQueryObject = {
    createdBy: new Types.ObjectId(userId),
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (status) {
    queryObject.status = status;
  }

  console.log(queryObject);

  let result = JobsModel.find(queryObject);

  // SORT
  if (sort === "latest") {
    result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result.sort("createdAt");
  }

  if (sort === "a-z") {
    result.sort("position");
  }

  if (sort === "z-a") {
    result.sort("-position");
  }
  //

  const jobs = await result;

  return jobs;
};

export { getAllJobsService };
