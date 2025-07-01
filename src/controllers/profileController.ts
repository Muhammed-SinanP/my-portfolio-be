import { Request, Response, NextFunction } from "express";
import { IProfile, Profile } from "../models/profileModel.ts";

export const profileDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const myProfile: IProfile | null = await Profile.findOne();

    if (!myProfile) {
      res.status(404).json({
        message: "Profile not found",
      });
      return;
    }

    res.status(200).json({
      data: myProfile,
      message: "Profile fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};
