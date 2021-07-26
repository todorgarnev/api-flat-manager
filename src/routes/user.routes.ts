import express, { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router: Router = express.Router();

router.get('/', UserController.getAll);
router.post('/register', UserController.register);

export default router;