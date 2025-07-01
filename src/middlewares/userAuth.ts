import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
  user?: string | JwtPayload; // decoded token payload type
}

export const userAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(404).json({ message: "No token available" });
      return;
    }

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      res.status(500).json({ message: "JWT secret key not configured" });
      return;
    }

    const decodedToken = jwt.verify(token, secret);

    if (!decodedToken) {
      res.status(401).json({ message: "User not authorized, invalid token" });
      return;
    }

    req.user = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};
