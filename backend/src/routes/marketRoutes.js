import express from "express";
import {
  createMarketItem,
  getMarketItems,
  updateMarketItem,
  deleteMarketItem,
  getMarketItemById,
} from "../controllers/marketController.js";
import auth from "../middleware/auth.js";
import marketUpload from "../middleware/marketUpload.js";

const router = express.Router();

// Public: anyone can view
router.get("/", getMarketItems);
router.get("/:id", getMarketItemById);

// Protected: only admin or market_head can manage
router.post("/", auth(["admin", "market_head"]), marketUpload.single("image"), createMarketItem);
router.put("/:id", auth(["admin", "market_head"]), marketUpload.single("image"), updateMarketItem);
router.delete("/:id", auth(["admin", "market_head"]), deleteMarketItem);

export default router;
