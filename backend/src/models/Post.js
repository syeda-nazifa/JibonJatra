import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["daily", "news", "community"],
      default: "daily",
    },
    location: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
