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
    facebookLink: String,
    xLink: String,
    discordLink: String,
    country: String,
    universityCollege: String,
    universityCountry: String,
    educationTitle: String,
    graduationYear: String,
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
