export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createJWT: () => string;
    comparePassword: (password: string) => boolean;
  }
  