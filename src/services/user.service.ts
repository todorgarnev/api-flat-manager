import bcrypt from "bcrypt";
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
import { generateToken } from "../utils/token-generation.util";
import ILoginInput from "../interfaces/login.interface";

const getAll = async () => {
  try {
    return await User.find();
  } catch (e) {
    throw Error("GET Users error.");
  }
};

const register = async (user: IUser) => {
  try {
    const { username, email, password } = user;
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

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser: IUser = new User({ username, email, password: hashedPassword });
    const savedUser: IUser = await newUser.save();

    return generateToken(savedUser);
  } catch (e) {
    throw Error(e);
  }
};

const login = async (loginData: ILoginInput) => {
  try {
    const { username, password } = loginData;
    const foundUser: IUser | null = await User.findOne({ username });

    if (!foundUser) {
      throw new Error("User not found");
    }

    if (password) {
      const passwordMath: boolean = await bcrypt.compare(password, foundUser.password);

      if (!passwordMath) {
        throw new Error("Wrong password");
      }
    }

    return generateToken(foundUser);
  } catch (e) {
    throw Error(e);
  }
}

export {
  getAll,
  register,
  login
};