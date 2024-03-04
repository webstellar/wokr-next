import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
  {
    skill: String,
    skillLevel: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    automations: [{ type: Schema.Types.ObjectId, ref: "Automation" }],
  },
  { timestamps: true }
);

export const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);
