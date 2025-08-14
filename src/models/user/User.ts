import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password?: string; // Only if credentials provider
  image?: string;
  isVerified: boolean;
  provider?: string; // 'google', 'credentials', etc.
  createdAt: Date;
  verificationToken?: string; // For email verification
  verificationTokenExpiresAt?: Date; // For email verification
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, default: "Profile User" },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    provider: { type: String, default: "credentials" },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
