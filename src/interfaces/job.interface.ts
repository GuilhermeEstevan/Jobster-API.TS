import { Types } from "mongoose";

export interface CustomRequest extends Request {
  user?: {
    userId: string;
    name: string;
  };
}

export interface JobsDocument extends Document {
  position: string;
  company: string;
  status: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
