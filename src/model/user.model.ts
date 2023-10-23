import mongoose from "mongoose";

export enum USER_ROLES {
  ADMIN = 0,
  SUPER_ADMIN = 1,
  CLIENT = 2,
}

export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: USER_ROLES;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: USER_ROLES.CLIENT,
      enum: USER_ROLES,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
