import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import * as UserService from "../services/user.service";

const getUsers = async function (req: Request, res: Response) {
  try {
    const users: IUser[] = await UserService.getUsers();
    return res.status(200).json({ data: users, message: "Succesfully Users Retrieved" });
  } catch (e) {
    return res.status(404).json({ status: 400, message: e.message });
  }
};

export {
  getUsers
};