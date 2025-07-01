import express, { Router } from "express";
import { userAuth } from "../middlewares/userAuth.ts";
import {
  addCertification,
  addProject,
  changePassword,
  checkAuth,
  googleCallback,
  googleSign,
  login,
  logout,
} from "../controllers/adminController.ts";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const router: Router = express.Router();

// router.post("/register", register);
router.post("/login", login);
router.post("/changePassword", changePassword);
router.get("/googleSignIn", googleSign);
router.get("/googleSignIn/callback", googleCallback);
router.get("/checkAuth", userAuth, checkAuth);

router.post("/addProject", userAuth, upload.single("thumbnail"), addProject);
router.post(
  "/addCertification",
  userAuth,
  upload.single("certificate"),
  addCertification
);

router.post("/logout", userAuth, logout);

export { router as adminRouter };
