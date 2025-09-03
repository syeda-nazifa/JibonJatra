import Item from "../models/Item.js";

// GET all items (with filters)
export const getItems = async (req, res) => {
  try {
    const { type, search } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: "i" };

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// CREATE item
export const createItem = async (req, res) => {
  try {
    const { title, description, type } = req.body;
    if (!title || !description || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      title,
      description,
      type,
      user: req.user.id, // ✅ from verifyUser
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: "Failed to create item" });
  }
};

// DELETE item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
};