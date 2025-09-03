import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["daily", "news", "community", "home_rental"],
    default: "daily"
  },
  location: { type: String, required: true },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        // Max 3 images for home_rental posts
        return this.category !== 'home_rental' || v.length <= 3;
      },
      message: 'Home rentals can have maximum 3 images'
    }
  },
  // NEW FIELDS FOR HOME RENTAL:
  rent: { type: Number }, // only for home_rental
  status: { type: String, enum: ["available", "rented"], default: "available" }, // only for home_rental
}, { timestamps: true });

export default mongoose.model("Post", postSchema);