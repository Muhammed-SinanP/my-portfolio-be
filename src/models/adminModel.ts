import mongoose, { Document, Schema, Model, Types } from "mongoose";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  singleton: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    singleton: {
      type: Boolean,
      unique: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  adminSchema
);
