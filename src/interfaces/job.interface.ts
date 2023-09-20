import { Types } from "mongoose";

export interface JobsDocument extends Document {
  position: string;
  company: string;
  status: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser {
  userId: string;
  name: string;
}

export type TJobRequest = {
  company: string;
  position: string;
  status?: string;
};

export type TJobResponse = {
  company: string;
  position: string;
  status: string;
  createdBy: Types.ObjectId;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export interface IQueryParams {
  search?: string;
  status?: string;
  jobType?: string;
  sort?: string;
  page?: string;
}

export type TQueryObject = {
  position?: {
    $regex: string;
    $options: string;
  };
  status?: string;
  jobType?: string;
  createdBy: Types.ObjectId;
};
