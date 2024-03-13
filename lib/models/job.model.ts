import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [
      {
        skill: {
          type: String,
        },
        skillLevel: {
          type: String,
        },
      },
    ],
    tags: [{ name: String }],
    categories: [{ name: String }],
    tools: [
      {
        automation: String,
        automationLevel: String,
      },
    ],
    deliveryTime: {
      type: String,
      required: true,
    },
    maxRevisions: {
      type: String,
      required: true,
    },
    servicesIncluded: [
      {
        name: String,
      },
    ],
    jobStatus: {
      type: String,
      default: "Open",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
