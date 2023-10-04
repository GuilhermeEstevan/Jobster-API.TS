import mongoose, { Schema } from "mongoose";
import { JobsDocument } from "../interfaces/job.interface";

const JobsSchema = new Schema<JobsDocument>(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      minlength: 3,
      maxlength: 50,
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      minlength: 3,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pendente", "entrevista", "recusado"],
      default: "pendente",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    jobType: {
      type: String,
      enum: ["integral", "remoto", "meio período", "estágio"],
      default: "integral",
    },
    jobLocation: {
      type: String,
      default: "My City",
      required: true,
    },
  },
  { timestamps: true }
);

const JobsModel = mongoose.model<JobsDocument>("Job", JobsSchema);

export default JobsModel;
