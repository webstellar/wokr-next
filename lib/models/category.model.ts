import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    automation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Automation",
      },
    ],
  },
  { timestamps: true }
);
export const Category = mongoose.model("Category", categorySchema);
