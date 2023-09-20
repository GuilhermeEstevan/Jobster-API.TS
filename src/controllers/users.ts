import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserService } from "../services/users/registerUser";
import {
  TLoginResponse,
  TRegistrationResponse,
} from "../interfaces/user.interface";
import { loginUserService } from "../services/users/loginUser";

const register = async (
  req: Request,
  res: Response
): Promise<Response<TRegistrationResponse>> => {
  const user = await createUserService(req.body);

  return res.status(200).json({ user });
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<TLoginResponse>> => {
  const user = await loginUserService(req.body);

  return res.status(StatusCodes.OK).json({ user });
};

export { register };
