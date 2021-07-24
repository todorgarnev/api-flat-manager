import User from "../models/user.model";

const getUsers = async () => {
  try {
    return await User.find();
  } catch (e) {
    throw Error("GET Users error.");
  }
};

export {
  getUsers
};