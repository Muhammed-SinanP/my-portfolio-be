import { Request, Response, NextFunction } from "express";
import { sendEmail } from "../utils/email.ts";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name, topic, message } = req.body;

    if (!email || !name || !topic || !message) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    await sendEmail(name, email, topic, message);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};
