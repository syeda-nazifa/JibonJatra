import mongoose from 'mongoose';

const sponsoredPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  // ❌ REMOVED: link field
  // ❌ REMOVED: isActive field
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

// Update index (remove isActive)
sponsoredPostSchema.index({ endDate: 1 });
sponsoredPostSchema.index({ createdBy: 1 });

const SponsoredPost = mongoose.model('SponsoredPost', sponsoredPostSchema);

export default SponsoredPost;