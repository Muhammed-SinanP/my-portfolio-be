import express, { Router } from "express";
import { sendMessage } from "../controllers/userController.ts";

const router: Router = express.Router();

router.post("/sendMessage", sendMessage);

export { router as userRouter };
