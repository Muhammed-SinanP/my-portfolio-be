import express, { Router } from "express";
import { profileDetails } from "../controllers/profileController.ts";

const router: Router = express.Router();

router.get("/details", profileDetails);

export { router as profileRouter };
