import { Request, Response } from "express";
import UserModel from "../models/users";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import Unauthenticated from "../errors/unauthenticated";
import {
  createUserService,
  loginUserService,
} from "../services/users/userService.ts";
import {
  TLoginResponse,
  TRegistrationResponse,
} from "../interfaces/user.interface";

const register = async (
  req: Request,
  res: Response
): Promise<Response<TRegistrationResponse>> => {
  const newUser = await createUserService(req.body);

  return res.status(200).json({ newUser });
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response<TLoginResponse>> => {
  const user = await loginUserService(req.body);

  return res.status(StatusCodes.OK).json({ user });
};

export { register };
