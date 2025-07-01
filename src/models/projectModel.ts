import mongoose, { Document, Schema, Model } from "mongoose";
interface IGitHubLink {
  label: string;
  url: string;
}
export interface IProject extends Document {
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  gitHubLink: IGitHubLink[];
  liveLink: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  client: string;
  order: number;
  mini: boolean;
}

const projectSchema: Schema<IProject> = new Schema(
  {
    title: { type: String, required: true },
    category: String,
    thumbnail: String,
    description: String,
    technologies: [String],
    keyFeatures: [String],
    gitHubLink: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    liveLink: String,
    type: String,
    client: String,
    order: Number,
    mini: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema
);
