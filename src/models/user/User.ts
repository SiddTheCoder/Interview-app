import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // Only if credentials provider
  image?: string;
  provider?: string; // 'google', 'credentials', etc.
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true , unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  provider: { type: String, default: "credentials" },
  createdAt: { type: Date, default: Date.now },
},{timestamps: true});

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
