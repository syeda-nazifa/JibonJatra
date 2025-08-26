import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from "../controllers/postController.js";
import protect from "../middleware/auth.js";
import { upload } from "../utils/multer.js"

const router = express.Router();

// router.post("/", auth(), createPost);
router.route("/")
  .get(getPosts)
  .post(protect(),upload.array('images', 10), createPost);

router.route("/:id")
  .get(getPostById)
  .put(protect(),upload.array('images', 10), updatePost)
  .delete(protect(), deletePost);

export default router;
