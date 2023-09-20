import AppError from "./app.error";

export class NotFound extends AppError {
  constructor(message: string, statusCode: number = 404) {
    super(message, statusCode);
  }
}
