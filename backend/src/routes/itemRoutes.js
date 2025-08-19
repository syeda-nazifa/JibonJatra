// itemRoute.js
import { Router } from "express";
import { createItem, listItems, deleteItem } from "../controllers/itemController.js";
import { upload } from "../utils/multer.js";

export const itemRouter = Router();

// ➤ Get all items
itemRouter.get("/", listItems);

// ➤ Create lost/found item with image
itemRouter.post("/", upload.single("image"), createItem);

// ➤ Delete item
itemRouter.delete("/:id", deleteItem);
