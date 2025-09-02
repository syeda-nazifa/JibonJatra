import express from "express";
import {
  createHome,
  getAllHomes,
  getHomeById,
  updateHome,
  deleteHome,
  removeImage
} from "../controllers/homeController.js";
import protect from "../middleware/auth.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// For creating homes - accept JSON or form-data
router.route("/")
  .get(getAllHomes)
  .post(protect(), upload.array('images', 3), createHome);

// For updating homes - accept JSON or form-data  
router.route("/:id")
  .get(getHomeById)
  .put(protect(), upload.array('images', 3), updateHome)
  .delete(protect(), deleteHome);

// Route to remove specific image
router.delete("/:homeId/images/:imageIndex", protect(), removeImage);

export default router;