import { Request, Response } from "express";
import AppError from "./app.error";

// export const notFound = (req: Request, res: Response) => {
//   res.status(400).send("Route does not exist");
// };

export class NotFound extends AppError {
  constructor(message: string, statusCode: number = 404) {
    super(message);
  }
}
