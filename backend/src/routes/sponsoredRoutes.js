import express from 'express';
import {
  getSponsoredPosts,
  getAllSponsoredPosts,
  createSponsoredPost,
  updateSponsoredPost,
  deleteSponsoredPost,
  getSponsoredPost
} from '../controllers/sponsoredController.js';
import auth from '../middleware/auth.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// 🔒 CHANGED: Added auth() to require ANY authenticated user
router.get('/', auth(), getSponsoredPosts);          // ← ADD auth()
router.get('/:id', auth(), getSponsoredPost);        // ← ADD auth()

// Admin routes - require admin role (unchanged)
router.get('/admin/all', auth('admin'), getAllSponsoredPosts);
router.post('/', auth('admin'), upload.single('images'), createSponsoredPost);
router.put('/:id', auth('admin'), upload.single('images'), updateSponsoredPost);
router.delete('/:id', auth('admin'), deleteSponsoredPost);

export default router;