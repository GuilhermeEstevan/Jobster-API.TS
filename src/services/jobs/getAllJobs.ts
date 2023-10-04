import { Types } from "mongoose";
import {
  IQueryParams,
  TGetAllJobsResponse,
  TQueryObject,
} from "../../interfaces/job.interface";
import JobsModel from "../../models/jobs";

const getAllJobsService = async (
  userId: string,
  query: IQueryParams
): Promise<TGetAllJobsResponse> => {
  const { search, status, jobType, sort } = query;

  const queryObject: TQueryObject = {
    createdBy: new Types.ObjectId(userId),
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (status && status != "todos") {
    queryObject.status = status;
  }

  if (jobType && jobType != "todos") {
    queryObject.jobType = jobType;
  }

  

  let result = JobsModel.find(queryObject);

  // SORT
  if (sort === "mais recente") {
    result.sort("-createdAt");
  }

  if (sort === "mais antigo") {
    result.sort("createdAt");
  }

  if (sort === "a-z") {
    result.sort("position");
  }

  if (sort === "z-a") {
    result.sort("-position");
  }
  //

  // PAGINATION
  const page = Number(query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(10);

  const jobs = await result;
  const totalJobs = await JobsModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  return { jobs, totalJobs, numOfPages };
};

export { getAllJobsService };
