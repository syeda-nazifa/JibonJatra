// backend/src/routes/feedRoutes.js
import express from 'express';
import { getFeed, getFilteredFeed } from '../controllers/feedController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get complete feed with all content types
router.get('/', auth([]), getFeed); // Pass empty array for no role restrictions

// Get filtered feed by content type
router.get('/filter/:type', auth([]), getFilteredFeed); // Pass empty array

export default router;