// models/interview/InterviewQuestion.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInterviewQuestion extends Document {
  session: Types.ObjectId;
  index: number; // Question number
  questionText: string;
  answerText?: string;
  scores: {
    fluency: number;
    pronunciation: number;
    content: number;
  };
  createdAt: Date;
}

const InterviewQuestionSchema = new Schema<IInterviewQuestion>({
  session: {
    type: Schema.Types.ObjectId,
    ref: "InterviewSession",
    required: true,
  },
  index: { //question no. among 10
    type: Number,
    required: true
  },
  questionText: { type: String, required: true },
  answerText: { type: String },
  scores: {
    fluency: { type: Number, default: 0 },
    pronunciation: { type: Number, default: 0 },
    content: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.InterviewQuestion ||
  mongoose.model<IInterviewQuestion>(
    "InterviewQuestion",
    InterviewQuestionSchema
  );
