import Post from "../models/Post.js";

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);
    console.log("req.user.id:", req.user?.id);

    const { title, content, category, location, rent, status } = req.body;

    // Validate required fields
    if (!title || !content || !location) {
      return res.status(400).json({ 
        message: "Title, content, and location are required" 
      });
    }

    // If category is home_rental, user must be homeowner or admin
    if (category === "home_rental") {
      if (req.user.role !== "homeowner" && req.user.role !== "admin") {
        return res.status(403).json({ message: "Only homeowners can post rentals" });
      }
      if (!rent) {
        return res.status(400).json({ message: "Rent is required for home rentals" });
      }
    }

    // Check image limit for home_rental
    if (category === "home_rental" && req.files && req.files.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed for home rentals" });
    }

    // Handle image uploads
    let imageFilenames = [];
    if (req.files && req.files.length > 0) {
      imageFilenames = req.files.map(file => file.filename);
    }

    const post = await Post.create({
      user: req.user.id,
      title,
      content,
      category: category || "daily",
      location,
      images: imageFilenames,
      rent: category === "home_rental" ? rent : undefined,
      status: category === "home_rental" ? (status || "available") : undefined
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only owner or admin can update
    if (post.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    // If updating to home_rental or already home_rental, check if user is homeowner or admin
    if (req.body.category === "home_rental" || post.category === "home_rental") {
      if (req.user.role !== "homeowner" && req.user.role !== "admin") {
        return res.status(403).json({ message: "Only homeowners can manage rentals" });
      }
    }

    // Check image limit for home_rental posts
    if (post.category === "home_rental" || req.body.category === "home_rental") {
      const existingImages = post.images || [];
      const newImages = req.files ? req.files.map(file => file.filename) : [];
      const totalImages = [...existingImages, ...newImages];
      
      if (totalImages.length > 3) {
        return res.status(400).json({ message: "Maximum 3 images allowed for home rentals" });
      }
    }

    let imageFilenames = post.images || [];
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      imageFilenames = [...imageFilenames, ...newImages];
    }

    // Update post fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    post.location = req.body.location || post.location;
    post.images = imageFilenames;

    // Update rental-specific fields if category is home_rental
    if (post.category === "home_rental") {
      post.rent = req.body.rent !== undefined ? req.body.rent : post.rent;
      post.status = req.body.status || post.status;
    } else {
      // Clear rental fields if changing from home_rental to another category
      post.rent = undefined;
      post.status = undefined;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Allow deletion by owner OR admin
    if (post.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get posts by category
// @route   GET /api/posts/category/:category
// @access  Public
export const getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category }).populate("user", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};