// models/interview/SpeechAnalysis.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISpeechAnalysis extends Document {
  question: Types.ObjectId;
  transcript: string;
  rawAudioUrl?: string;
  pronunciationDetails?: any;
  createdAt: Date;
}

const SpeechAnalysisSchema = new Schema<ISpeechAnalysis>({
  question: {
    type: Schema.Types.ObjectId,
    ref: "InterviewQuestion",
    required: true,
  },
  transcript: { type: String, required: true },
  rawAudioUrl: { type: String },
  pronunciationDetails: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SpeechAnalysis ||
  mongoose.model<ISpeechAnalysis>("SpeechAnalysis", SpeechAnalysisSchema);
