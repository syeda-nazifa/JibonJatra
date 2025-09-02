import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rent: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String }], // Array of image filenames
  status: { type: String, enum: ["available", "rented"], default: "available" },
}, { timestamps: true });

export default mongoose.model("Home", homeSchema);