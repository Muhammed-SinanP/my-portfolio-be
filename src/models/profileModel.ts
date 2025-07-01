import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProfile extends Document {
  fullName: string;
  intro?: string;
  title: string;
  profileSummary?: string;
  profilePicture?: string;
  resume?: string;
  contact: {
    number: number;
    email: string;
    address?: {
      district?: string;
      state?: string;
      country?: string;
    };
  };
  socialLinks?: {
    email?: string;
    linkedIn?: string;
    gitHub?: string;
    instagram?: string;
    leetCode?: string;
    whatsApp?: string;
  };
  skills?: {
    languages?: string[];
    frontend?: string[];
    backend?: string[];
    database?: string[];
    cloud?: string[];
    tools?: string[];
    other?: string[];
  };
  singleton: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema: Schema<IProfile> = new Schema(
  {
    fullName: { type: String, required: true },
    intro: { type: String, required: true },
    title: { type: String, required: true },
    profileSummary: { type: String, required: true },
    profilePicture: String,
    resume: String,
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: {
        district: String,
        state: String,
        country: String,
      },
    },
    socialLinks: {
      email: String,
      linkedIn: String,
      gitHub: String,
      instagram: String,
      leetCode: String,
      whatsApp: String,
    },
    skills: {
      languages: [String],
      frontend: [String],
      backend: [String],
      database: [String],
      cloud: [String],
      tools: [String],
      other: [String],
    },
    singleton: { type: Boolean, unique: true, default: true },
  },
  { timestamps: true }
);

export const Profile: Model<IProfile> = mongoose.model<IProfile>(
  "Profile",
  profileSchema
);
