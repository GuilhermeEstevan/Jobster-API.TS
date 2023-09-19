import {
  TLoginRequest,
  TLoginResponse,
  TRegistrationResponse,
  UserDocument,
} from "../../interfaces/user.interface";
import UserModel from "../../models/users";
import { TUserRegistrationRequest } from "../../interfaces/user.interface";
import { BadRequestError, Unauthenticated } from "../../errors";

const createUserService = async (
  Data: TUserRegistrationRequest
): Promise<TRegistrationResponse> => {
  const newUser = await UserModel.create(Data);

  const response: TRegistrationResponse = {
    user: {
      name: newUser.name,
      email: newUser.email,
      token: newUser.createJWT(),
    },
  };

  return response;
};

const loginUserService = async (
  Data: TLoginRequest
): Promise<TLoginResponse> => {
  const { email, password } = Data;

  // MISSING FIELDS
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  let user = await UserModel.findOne({ email });

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

  return {
    user: {
      name: user.name,
      email: user.email,
      token,
    },
  };
};

export { createUserService, loginUserService };
