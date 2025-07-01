import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (adminId: string): string | undefined => {
  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET_KEY);
    return token;
  } catch (err) {
    console.error(err, "==== error occurred while generating token");
    return undefined;
  }
};
