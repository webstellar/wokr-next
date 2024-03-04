import mongoose, { Schema } from "mongoose";

const toolSchema = new Schema(
  {
    title: String,
    imageUrl: String,
  },
  { timestamps: true }
);
export const Tool = mongoose.model("Tool", toolSchema);
