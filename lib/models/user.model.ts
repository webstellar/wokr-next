import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
    },
    bio: String,
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
    profileImage: String,
    skillset: [{ skill: String, experienceLevel: String }],
    facebookLink: String,
    googleLink: String,
    xLink: String,
    discordLink: String,
    country: String,
    timeZone: String,
    languages: [{ language: String, languageLevel: String }],
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
