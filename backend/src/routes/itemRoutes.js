import express from "express";
import multer from "multer";
import { createItem, getItems, deleteItem } from "../controllers/itemController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

// Multer storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get("/", getItems); // ✅ GET /api/items
router.post("/", verifyUser, upload.single("image"), createItem); // ✅ POST /api/items
router.delete("/:id", verifyUser, deleteItem); // ✅ DELETE /api/items/:id

export default router;
