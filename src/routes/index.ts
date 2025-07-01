import express, { Router } from "express";
import { profileRouter } from "./profileRoutes.ts";
import { projectRouter } from "./projectRoutes.ts";
import { adminRouter } from "./adminRoutes.ts";
import { certificationRouter } from "./certificationRoutes.ts";
import { userRouter } from "./userRoutes.ts";

const router: Router = express.Router();

router.use("/profile", profileRouter);
router.use("/project", projectRouter);
router.use('/certification',certificationRouter)
router.use("/admin", adminRouter);
router.use('/user',userRouter)

export { router as apiRouter };
