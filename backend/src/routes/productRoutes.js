import express from "express";
import auth from "../middleware/auth.js";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "./uploads", // Make sure this folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/** Create product (Shopkeeper) with optional image upload */
router.post("/", auth("shopkeeper"), upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, shopName, shopLocation, inStock } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name,
      description: description || "",
      price,
      imageUrl,
      shopName: shopName || "",
      shopLocation: shopLocation || "",
      inStock: inStock !== undefined ? !!inStock : true,
      owner: req.user.id,
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/** Public list (all users can view) */
router.get("/", async (req, res) => {
  try {
    const { q, shop, inStock, owner } = req.query;
    const filter = {};

    if (q) filter.name = { $regex: q, $options: "i" };
    if (shop) filter.shopName = { $regex: shop, $options: "i" };
    if (inStock !== undefined) filter.inStock = inStock === "true";
    if (owner) filter.owner = owner;

    const products = await Product.find(filter)
      .populate("owner", "name role")
      .sort({ createdAt: -1 });

    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/** List my products (Shopkeeper only) */
router.get("/mine", auth("shopkeeper"), async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/** Get single (public) */
router.get("/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id).populate("owner", "name role");
    if (!item) return res.status(404).json({ message: "Product not found" });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid id" });
  }
});

/** Update product (only owner; admin cannot edit) */
router.put("/:id", auth(["shopkeeper", "admin"]), async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });

    // Admins cannot edit, only delete
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot edit products. Only delete allowed." });
    }

    // Shopkeeper can only edit own product
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not your product" });
    }

    const fields = ["name", "description", "price", "imageUrl", "shopName", "shopLocation", "inStock"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) item[f] = req.body[f];
    });

    await item.save();
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/** Delete product (owner OR admin) */
router.delete("/:id", auth(["shopkeeper", "admin"]), async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not your product" });
    }

    await item.deleteOne();
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
