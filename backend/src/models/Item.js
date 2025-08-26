import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["lost", "found"], required: true, index: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    image: { type: String, default: null }, // /uploads/filename.ext
    location: { type: String, trim: true, default: "" },
    contact: { type: String, trim: true, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner
  },
  { timestamps: true }
);

itemSchema.index({ title: "text", description: "text", location: "text" });

export default mongoose.model("Item", itemSchema);
