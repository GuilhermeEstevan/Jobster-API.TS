export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createJWT: () => string;
  comparePassword: (password: string) => boolean;
}

export type TUserRegistrationRequest = {
  name: string;
  email: string;
  password: string;
};

export type TRegistrationResponse = {
  name: string;
  email: string;
  token: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  name: string;
  email: string;
  token: string;
};
