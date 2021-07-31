import { Request, Response } from "express";
import IUser from "../interfaces/user.interface";
import * as UserService from "../services/user.service";
import { validateLoginInput, validateRegisterInput } from "../utils/validation.util";

const getAll = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await UserService.getAll();
    return res.status(200).json({ usersList: users });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { valid, errors } = validateRegisterInput(req.body);

    if (valid) {
      const token: string = await UserService.register(req.body);
      return res.status(200).json({ token });
    } else {
      return res.status(422).json(errors);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { valid, errors } = validateLoginInput(req.body);

    if (valid) {
      const token: string = await UserService.login(req.body);
      return res.status(200).json({ token });
    } else {
      return res.status(422).json(errors);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

export {
  getAll,
  register,
  login
};