import { Request, Response } from "express";
import UserModel from "../models/users";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import Unauthenticated from "../errors/unauthenticated";

const register = async (req: Request, res: Response): Promise<Response> => {
  const newUser = await UserModel.create(req.body);
  const token = newUser.createJWT();

  return res.status(200).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      token,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // MISSING FIELDS
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await UserModel.findOne({ email });

  // NO USER FOUND
  if (!user) {
    throw new Unauthenticated(`Invalid Credentials`);
  }

  // COMPARE PASSWORDS
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const token = user.createJWT();

  return res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

export { register };
