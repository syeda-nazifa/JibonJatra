import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    providerName: { type: String, required: true, trim: true },
    serviceName: { type: String, required: true, trim: true },
    servicePrice: { type: Number, required: true, min: 0 },
    // can be a full URL (Cloudinary/S3) or a local path (e.g., /uploads/services/169999-file.jpg)
    servicePicture: { type: String, default: null },

    publishDate: { type: Date, default: Date.now },
    serviceDetail: { type: String, default: "" },
    serviceType: {
      type: String,
      default: "basic",
    },
    providerContact: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);

