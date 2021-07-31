import mongoose, { Schema } from "mongoose";
import IPayment from "../interfaces/payment.interface";

const PaymentSchema = new Schema(
  {
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);