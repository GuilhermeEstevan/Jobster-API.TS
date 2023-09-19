import { TLoginRequest, TLoginResponse } from "../../interfaces/user.interface";
import { BadRequestError, Unauthenticated } from "../../errors";
import UserModel from "../../models/users";

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

  return {
    name: user.name,
    email: user.email,
    token: user.createJWT(),
  };
};

export { loginUserService };
