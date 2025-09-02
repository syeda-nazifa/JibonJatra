import Home from "../models/Home.js";

// @desc    Create new home rental
// @route   POST /api/homes
// @access  Private (Homeowner or Admin)
export const createHome = async (req, res) => {
  try {
    const { title, description, rent, location, status } = req.body;

    // Validate required fields
    if (!title || !description || !rent || !location) {
      return res.status(400).json({ 
        message: "Title, description, rent, and location are required" 
      });
    }

    // Check if user is homeowner or admin
    if (req.user.role !== "homeowner" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only homeowners can post rentals" });
    }

    // Check image limit (max 3)
    if (req.files && req.files.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }

    const imageFilenames = req.files ? req.files.map(file => file.filename) : [];

    const home = await Home.create({
      user: req.user.id,
      title,
      description,
      rent: Number(rent),
      location,
      images: imageFilenames,
      status: status || "available"
    });

    // Populate user info in response
    await home.populate("user", "name email");
    
    res.status(201).json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all home rentals
// @route   GET /api/homes
// @access  Public
export const getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find().populate("user", "name email");
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single home rental by ID
// @route   GET /api/homes/:id
// @access  Public
export const getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id).populate("user", "name email");
    if (!home) {
      return res.status(404).json({ message: "Home rental not found" });
    }
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update home rental
// @route   PUT /api/homes/:id
// @access  Private (Owner or Admin)
export const updateHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Home rental not found" });
    }

    // Check ownership
    if (home.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check image limit (max 3 including existing + new)
    const existingImages = home.images || [];
    const newImages = req.files ? req.files.map(file => file.filename) : [];
    const totalImages = [...existingImages, ...newImages];
    
    if (totalImages.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }

    // Update fields from request body
    if (req.body.title !== undefined) home.title = req.body.title;
    if (req.body.description !== undefined) home.description = req.body.description;
    if (req.body.rent !== undefined) home.rent = Number(req.body.rent);
    if (req.body.location !== undefined) home.location = req.body.location;
    if (req.body.status !== undefined) home.status = req.body.status;
    
    // Add new images to existing ones
    if (req.files && req.files.length > 0) {
      home.images = [...home.images, ...newImages];
    }

    home.updatedAt = Date.now();
    const updatedHome = await home.save();
    
    // Populate user info in response
    await updatedHome.populate("user", "name email");
    
    res.json(updatedHome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete home rental
// @route   DELETE /api/homes/:id
// @access  Private (Owner or Admin)
export const deleteHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Home rental not found" });
    }

    // Check ownership or admin
    if (home.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Home.findByIdAndDelete(req.params.id);
    res.json({ message: "Home rental deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove specific image from home rental
// @route   DELETE /api/homes/:homeId/images/:imageIndex
// @access  Private (Owner or Admin)
export const removeImage = async (req, res) => {
  try {
    const { homeId, imageIndex } = req.params;
    const home = await Home.findById(homeId);
    
    if (!home) {
      return res.status(404).json({ message: "Home rental not found" });
    }
    
    // Check ownership
    if (home.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check if image index is valid
    if (imageIndex < 0 || imageIndex >= home.images.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    // Remove the image
    home.images.splice(parseInt(imageIndex), 1);
    home.updatedAt = Date.now();
    await home.save();

    // Populate user info in response
    await home.populate("user", "name email");
    
    res.json({ message: "Image removed successfully", home });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};