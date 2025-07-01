import express, { Router } from "express";
import { allCertifications } from "../controllers/certificationController.ts";

const router: Router = express.Router();

router.get("/all", allCertifications);

export { router as certificationRouter };
