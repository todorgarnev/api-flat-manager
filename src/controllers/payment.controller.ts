import { Request, Response } from "express";
import IPayment from "../interfaces/payment.interface";
import { validatePayment } from "../utils/validation.util";
import * as PaymentService from "../services/payment.service";

const getAll = async (req: Request, res: Response) => {
  try {
    const payments: IPayment[] = await PaymentService.getAll();
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const { valid, errors } = validatePayment(req.body);

    if (valid) {
      const savedPaymentResponse = await PaymentService.add(req.body);
      return res.status(200).json(savedPaymentResponse);
    } else {
      return res.status(422).json(errors);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export {
  getAll,
  add,
};