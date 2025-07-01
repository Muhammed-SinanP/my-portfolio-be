import { Request, Response, NextFunction } from "express";
import { Certification, ICertification } from "../models/certificationModel.ts";

export const allCertifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCertifications: ICertification[] = await Certification.find();
    if (allCertifications.length === 0) {
      res.status(404).json({ message: "Zero certifications found." });
      return;
    }
    res.status(200).json({
      data: allCertifications,
      message: "All certifications fetch success.",
    });
  } catch (err) {
    next(err);
  }
};
