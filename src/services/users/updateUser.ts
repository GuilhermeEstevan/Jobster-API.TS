import { BadRequestError } from "../../errors";
import {
  TUpdateRequest,
  TUpdateResponse,
} from "../../interfaces/user.interface";
import UserModel from "../../models/users";

const updateUserService = async (Data: TUpdateRequest, userId: string) => {
  const { name, lastName, local, email } = Data;

  if (!name || !lastName || !local || !email) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.local = local;

  await user.save();
  const token = user.createJWT();

  const response: TUpdateResponse = {
    name: user.name,
    email: user.email,
    token: token,
    lastName: user.lastName,
    local: user.local,
  };

  return response;
};

export default updateUserService;
