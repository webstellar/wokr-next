import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
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
export const Tag = mongoose.model("Tag", tagSchema);
