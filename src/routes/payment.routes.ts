import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import * as PaymentController from "../controllers/payment.controller";

const router: Router = express.Router();

router.get('/', auth, PaymentController.getAll);
router.post('/add', auth, PaymentController.add);

export default router;