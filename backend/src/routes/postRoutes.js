import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCategory
} from "../controllers/postController.js";
import protect from "../middleware/auth.js";
import { upload } from "../utils/multer.js"

const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(protect(), upload.array('images', 10), createPost);

router.route("/:id")
  .get(getPostById)
  .put(protect(), upload.array('images', 10), updatePost)
  .delete(protect(), deletePost);

// NEW ROUTE: Get posts by category
router.get("/category/:category", getPostsByCategory);

export default router;