import Market from "../models/Market.js";

// CREATE
export const createMarketItem = async (req, res) => {
  try {
    const { name, price, location, source } = req.body;

    if (!name || !price || !location || !source) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Market({
      name,
      price,
      location,
      source,
      image: req.file ? `/uploads/market/${req.file.filename}` : null,
      createdBy: req.user.id,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getMarketItems = async (req, res) => {
  try {
    const items = await Market.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single market item
export const getMarketItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Market.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE
// export const updateMarketItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, location, source } = req.body;

//     const updateData = { name, price, location, source };
//     if (req.file) {
//       updateData.image = `/uploads/market/${req.file.filename}`;
//     } else if (req.body.image) {
//   updateData.image = req.body.image; // accept URL from JSON
// }

//     const updated = await Market.findByIdAndUpdate(id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Item not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const updateMarketItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, location, source } = req.body;

    const item = await Market.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Check ownership
    if (req.user.role !== "admin" && req.user.id !== item.createdBy?.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this item" });
    }

    const updateData = { name, price, location, source };
    if (req.file) {
      updateData.image = `/uploads/market/${req.file.filename}`;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const updated = await Market.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// DELETE
// export const deleteMarketItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Market.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ message: "Item not found" });

//     res.json({ message: "Item deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const deleteMarketItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Market.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Check ownership
    if (req.user.role !== "admin" && req.user.id !== item.createdBy?.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
