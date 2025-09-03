
import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import auth from "../middleware/auth.js"; // your existing JWT auth (must attach req.user)
import { roleGuard } from "../middleware/roleGuard.js";
import  uploadSingleImage  from "../middleware/upload.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getServices);
router.get("/:id", getServiceById);

// Shopkeeper create (with optional file upload)
router.post(
  "/",
  auth([]),                 // must be logged in
  roleGuard(["service provider"]),
  uploadSingleImage.single("servicePicture"),    // accepts multipart/form-data or no file
  createService
);

// Owner or Admin update (optional new file)
router.put(
  "/:id",
  auth([]),
  roleGuard(["service provider", "admin"]),
  uploadSingleImage.single("servicePicture"),
  updateService
);

// Owner or Admin delete
router.delete(
  "/:id",
  auth([]),
  roleGuard(["service provider", "admin"]),
  deleteService
);

export default router;