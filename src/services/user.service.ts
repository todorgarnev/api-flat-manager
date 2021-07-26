import User from "../models/user.model";
import IUser from "../interfaces/user.interface";

const getAll = async () => {
  try {
    return await User.find();
  } catch (e) {
    throw Error("GET Users error.");
  }
};

const register = async (user: IUser) => {
  try {
    const { username, email } = user;
    const foundUser: IUser | null = await User.findOne({ $or: [{ username }, { email }] });

    if (foundUser) {
      const errors: any = {};

      if (username === foundUser.username) {
        errors.username = "This username is taken";
      }

      if (email === foundUser.email) {
        errors.email = "This email is taken";
      }

      throw new Error(errors);
    }

    const newUser: IUser = new User(user);
    // generate token
    return await newUser.save();
  } catch (e) {
    throw Error(e);
  }
};

export {
  getAll,
  register
};