import { Document } from "mongoose";
import IUser from "./user.interface";

export default interface IPayment extends Document {
  month: number;
  year: number;
  user: IUser;
}