import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../errors/app.error";
import { UserDocument } from "../interfaces/user.interface";

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// HASH PASSWORD
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// CREATE JSON WEB TOKEN
UserSchema.methods.createJWT = function () {
  if (!process.env.JWT_SECRET) {
    throw new AppError("JWT_SECRET is not defined!");
  }
  if (!process.env.JWT_LIFETIME) {
    throw new AppError("JWT_LIFETIME is not defined!");
  }

  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

// COMPARE GIVEN PASSWORD WITH HASHED PASSWORD
UserSchema.methods.comparePassword = async function (possiblePassword: string) {
  const isMatch = await bcrypt.compare(possiblePassword, this.password);
  return isMatch;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
