import { NextFunction, Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import * as UserService from "../services/user.service";
import { validateRegisterInput } from "../utils/validation.util";

const getAll = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await UserService.getAll();
    return res.status(200).json({ data: users });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { valid, errors } = validateRegisterInput(req.body);

    if (valid) {
      const token: any = await UserService.register(req.body);
      return res.status(200).json({ data: token });
    } else {
      return res.status(422).json(errors);
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

export {
  getAll,
  register
};