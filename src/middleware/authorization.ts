import { Response, Request, NextFunction } from "express";
import Unauthenticated from "../errors/unauthenticated";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/app.error";

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //Check for auth
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Authentication invalid!");
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("No JWT_SECRET", 500);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    res.locals = {
      userId: payload.userId,
      name: payload.name,
    };
  
    
    next();
  } catch (error) {
    console.log(error);
    throw new Unauthenticated("Authentication invalid!");
  }
};

export default authorizationMiddleware;
