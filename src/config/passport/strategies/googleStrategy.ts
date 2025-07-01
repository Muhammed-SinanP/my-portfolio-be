import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Request } from "express";
import { generateToken } from "../../../utils/token.ts";
import { Admin } from "../../../models/adminModel.ts";
import { VerifyCallback } from "passport-oauth2";

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/api/auth/googleSignIn/callback",
    passReqToCallback: true,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback
  ): Promise<void> => {
    try {
      const googleEmail = profile.emails?.[0]?.value;

      const admin = await Admin.findOne();

      if (!admin) {
        return cb(new Error("Admin not found"), false);
      }

      if (googleEmail !== admin.email) {
        return cb(new Error("Unauthorized email"), false);
      }

      const adminId = admin._id.toString();
      const token = generateToken(adminId);

      return cb(null, token);
    } catch (err) {
      return cb(err as Error, false);
    }
  }
);
