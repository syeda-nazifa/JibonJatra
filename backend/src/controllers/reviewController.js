import Review from '../models/Review.js';
import Service from '../models/Service.js';
import mongoose from 'mongoose';

// Helper function to update service rating
async function updateServiceRating(serviceId) {
  const result = await Review.aggregate([
    { $match: { serviceId: new mongoose.Types.ObjectId(serviceId) } },
    {
      $group: {
        _id: '$serviceId',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  if (result.length > 0) {
    await Service.findByIdAndUpdate(serviceId, {
      ratingAverage: parseFloat(result[0].averageRating.toFixed(1)),
      ratingCount: result[0].count
    });
  } else {
    await Service.findByIdAndUpdate(serviceId, {
      ratingAverage: 0,
      ratingCount: 0
    });
  }
}

// Create a new review
// export const createReview = async (req, res) => {
//   try {
//     const { serviceId, rating, comment } = req.body;
//     const userId = req.user.id;

//     // Check if the user is the service provider
//     const service = await Service.findById(serviceId);
//     if (service.provider.toString() === userId) {
//       return res.status(400).json({ 
//         message: 'Service providers cannot review their own services' 
//       });
//     }

//     // Check if user already reviewed this service
//     const existingReview = await Review.findOne({ 
//       serviceId, 
//       userId 
//     });
    
//     if (existingReview) {
//       return res.status(400).json({ 
//         message: 'You have already reviewed this service' 
//       });
//     }

//     // Create the review
//     const review = new Review({
//       serviceId,
//       userId,
//       rating,
//       comment
//     });

//     await review.save();

//     // Update service rating
//     await updateServiceRating(serviceId);

//     res.status(201).json({
//       message: 'Review added successfully',
//       review
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       message: 'Error creating review', 
//       error: error.message 
//     });
//   }
// };

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;
    const userId = req.user.id;

    console.log('Creating review for service:', serviceId);
    console.log('User ID:', userId);

    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ 
        message: 'Service not found' 
      });
    }

    console.log('Service found:', service);
    console.log('Service createdBy:', service.createdBy);

    // Check if the user is the service provider - use createdBy instead of provider
    if (service.createdBy && service.createdBy.toString() === userId) {
      return res.status(400).json({ 
        message: 'Service providers cannot review their own services' 
      });
    }

    // Check if user already reviewed this service
    const existingReview = await Review.findOne({ 
      serviceId, 
      userId 
    });
    
    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this service' 
      });
    }

    // Create the review
    const review = new Review({
      serviceId,
      userId,
      rating,
      comment
    });

    await review.save();

    // Update service rating
    await updateServiceRating(serviceId);

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ 
      message: 'Error creating review', 
      error: error.message 
    });
  }
};


// Get reviews for a service
export const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ serviceId })
      .populate('userId', 'name profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ serviceId });

    res.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalReviews: total
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching reviews', 
      error: error.message 
    });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const review = await Review.findOne({ _id: id, userId });
    
    if (!review) {
      return res.status(404).json({ 
        message: 'Review not found' 
      });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update service rating
    await updateServiceRating(review.serviceId);

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating review', 
      error: error.message 
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({ _id: id, userId });
    
    if (!review) {
      return res.status(404).json({ 
        message: 'Review not found' 
      });
    }

    const serviceId = review.serviceId;
    await Review.findByIdAndDelete(id);

    // Update service rating
    await updateServiceRating(serviceId);

    res.json({ 
      message: 'Review deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting review', 
      error: error.message 
    });
  }
};

// Get user's review for a specific service
export const getUserReviewForService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({ serviceId, userId })
      .populate('userId', 'name profilePicture');

    res.json({ review });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user review', 
      error: error.message 
    });
  }
};