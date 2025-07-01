import express, { Router } from "express";
import {
  allProjects,
  specificProject,
} from "../controllers/projectController.ts";

const router: Router = express.Router();

router.get("/all", allProjects);
router.get("/:projectId", specificProject);

export { router as projectRouter };
