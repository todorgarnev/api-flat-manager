import Payment from "../models/payment.model";
import User from "../models/user.model";
import IPayment from "../interfaces/payment.interface";
import IUser from "../interfaces/user.interface";

const getAll = async () => {
  try {
    return await Payment.find();
  } catch (error) {
    throw Error("GET Payments error");
  }
};

const add = async (payment: IPayment) => {
  try {
    const { month, year, user } = payment;

    if (user) {
      const foundUser: IUser | null = await User.findOne({ username: user.username });

      if (!foundUser) {
        throw new Error("Invalid user");
      }
    }

    const newPayment: IPayment = new Payment({ month, year, user: user.id });
    const savedPayment: IPayment = await newPayment.save();

    return {
      payment: savedPayment,
      message: "Payment saved successfully"
    };
  } catch (error) {
    throw Error(error);
  }
};

export {
  getAll,
  add
};