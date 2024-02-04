import mongoose, { Schema } from "mongoose";

const automationSchema = new Schema(
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
    tags: [{ type: String, default: "All" }],
    categories: [{ type: String, default: "All" }],
    feeType: String,
    price: {
      type: Number,
      required: true,
    },
    tools: [
      {
        type: {
          id: Schema.ObjectId,
          name: String,
          image: {
            url: String,
          },
        },
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
        type: String,
      },
    ],
    featuredImage: String,
    images: [{ url: String }],
    video: [{ url: String }],
    reviews: [{ body: String, date: Date }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    buyers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Automation =
  mongoose.models.Automation || mongoose.model("Automation", automationSchema);
