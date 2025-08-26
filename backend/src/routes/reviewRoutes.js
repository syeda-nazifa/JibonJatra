import express from 'express';
import {
  createReview,
  getServiceReviews,
  updateReview,
  deleteReview,
  getUserReviewForService
} from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js'; // Import the default export

const router = express.Router();

// All routes are protected - use the auth middleware directly
// The auth middleware function returns the actual middleware when called
router.use(authMiddleware()); // Call it to get the middleware function

router.post('/', createReview);
router.get('/service/:serviceId', getServiceReviews);
router.get('/user-review/:serviceId', getUserReviewForService);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;