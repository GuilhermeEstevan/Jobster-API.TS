import { StatusCodes } from "http-status-codes";
import AppError from "./app.error";

class BadRequestError extends AppError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
