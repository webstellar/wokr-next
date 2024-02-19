import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    description: String,
    phone: Number,
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profileType: [
      {
        type: String,
        default: "Seller",
      },
    ],
    phoneNumber: String,
    profileImage: String,
    country: String,
    timeZone: String,
    skillsets: [{ skill: String, skillLevel: String }],
    languages: [{ language: String, languageLevel: String }],
    automationTools: [{ automation: String, automationLevel: String }],
    automations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Automation",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
