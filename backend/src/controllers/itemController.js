import { Item } from "../models/Item.js";

// POST /api/items
export const createItem = async (req, res) => {
  const { type, title, description, location, contact } = req.body;
  if (!type || !title || !description) {
    return res.status(400).json({ message: "type, title and description are required" });
  }
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const doc = await Item.create({ type, title, description, image, location, contact });
  res.status(201).json(doc);
};

// GET /api/items?type=lost|found&search=cat&page=1&limit=10
export const listItems = async (req, res) => {
  const { type, search = "", page = 1, limit = 10 } = req.query;

  const q = {};
  if (type && ["lost", "found"].includes(type)) q.type = type;
  if (search) q.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Item.find(q).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Item.countDocuments(q)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

// DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const doc = await Item.findByIdAndDelete(id);
  if (!doc) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Deleted", id });
};
