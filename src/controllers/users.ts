import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserService } from "../services/users/registerUser";
import {
  TLoginResponse,
  TRegistrationResponse,
  TUpdateResponse,
} from "../interfaces/user.interface";
import { loginUserService } from "../services/users/loginUser";
import updateUserService from "../services/users/updateUser";

const register = async (
  req: Request,
  res: Response
): Promise<Response<TRegistrationResponse>> => {
  const user = await createUserService(req.body);

  return res.status(200).json({ user });
};

const login = async (
  req: Request,
  res: Response
): Promise<Response<TLoginResponse>> => {
  const user = await loginUserService(req.body);
  console.log(user);

  return res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<TUpdateResponse>> => {
  const { userId } = res.locals;
  const user = await updateUserService(req.body, userId);
  console.log(user);
  return res.status(StatusCodes.OK).json({ user });
};

export { register, login, updateUser };
