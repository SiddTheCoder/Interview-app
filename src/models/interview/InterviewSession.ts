// models/interview/InterviewSession.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInterviewSession extends Document {
  user: Types.ObjectId;
  topic: string;
  status: "ongoing" | "completed" | "cancelled";
  questions: Types.ObjectId[]; // Links to Question model
  scores: {
    fluency: number;
    pronunciation: number;
    content: number;
  };
  createdAt: Date;
}

const InterviewSessionSchema = new Schema<IInterviewSession>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "cancelled"],
    default: "ongoing",
  },
  questions: [
  // HERE WE will append the QUESTION_ID in each round max(10)
    {
      type: Schema.Types.ObjectId,
      ref: "InterviewQuestion",
    },
  ],
  scores: {
    fluency: {
      type: Number,
      default: 0,
    },
    pronunciation: {
      type: Number,
      default: 0,
    },
    content: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{timestamps: true});

export default (mongoose.models
  .InterviewSession as mongoose.Model<IInterviewSession>) ||
  mongoose.model<IInterviewSession>("InterviewSession", InterviewSessionSchema);
