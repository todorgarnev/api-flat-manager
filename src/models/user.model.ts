import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>("User", UserSchema);