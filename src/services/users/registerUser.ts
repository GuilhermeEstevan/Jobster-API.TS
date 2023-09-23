import {
  TRegistrationResponse,
  TUserRegistrationRequest,
} from "../../interfaces/user.interface";
import UserModel from "../../models/users";

const createUserService = async (
  Data: TUserRegistrationRequest
): Promise<TRegistrationResponse> => {
  const user = await UserModel.create(Data);

  // console.log(newUser);

  const response: TRegistrationResponse = {
    name: user.name,
    email: user.email,
    local: user.local,
    lastName: user.lastName,
    token: user.createJWT(),
  };

  return response;
};

export { createUserService };
