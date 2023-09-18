import mongoose, { Schema, Document, Types } from "mongoose";
import { JobsDocument } from "../interfaces/job.interface";

const JobsSchema = new Schema<JobsDocument>(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      minlength: 3,
      maxlength: 20,
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      minlength: 3,
      maxlength: 20,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
      minlength: 3,
      maxlength: 20,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const JobsModel = mongoose.model<JobsDocument>("/Job", JobsSchema);

export default JobsModel;
