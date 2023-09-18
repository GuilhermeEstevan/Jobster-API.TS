import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const noRoutes = (req: Request, res: Response): Response => {
  return res.status(StatusCodes.NOT_FOUND).send("Route not found");
};
