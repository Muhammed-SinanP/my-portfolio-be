import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICertification extends Document {
  title: string;
  certificate: string;
  description: string;
  verificationLink: string;
  issuer: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

const certificationSchema: Schema<ICertification> = new Schema(
  {
    title: { type: String, required: true },
    certificate: String,
    description: String,
    verificationLink: String,
    issuer: String,
    order: Number,
  },
  {
    timestamps: true,
  }
);

export const Certification: Model<ICertification> =
  mongoose.model<ICertification>("Certification", certificationSchema);
