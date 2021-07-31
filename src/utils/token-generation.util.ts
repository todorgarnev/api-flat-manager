import jwt from "jsonwebtoken";
import IUser from "../interfaces/user.interface";
import config from "../../config/default";

const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    config.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export { generateToken };
