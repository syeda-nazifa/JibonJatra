import Post from "../models/Post.js";

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
// export const createPost = async (req, res) => {
//   try {
//     const { title, content, category, location, images } = req.body;
//     console.log(req.body);
//     console.log("req.user.id:", req.user?.id);

//     const post = await Post.create({
//       user: req.user.id,
//       title,
//       content,
//       category,
//       location,
//       images: imageFilenames
//     });

//     res.status(201).json(post);
//   } catch (error) {
//   console.error("Error creating post:", error);
//   res.status(500).json({ message: error.message });
// }

// };
export const createPost = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);
    console.log("req.user.id:", req.user?.id);

    const { title, content, category, location } = req.body;
    
    // Validate required fields
    if (!title || !content || !location) {
      return res.status(400).json({ 
        message: "Title, content, and location are required" 
      });
    }

    // Handle image uploads - get filenames from req.files
    let imageFilenames = []; // Fixed: consistent capitalization
    if (req.files && req.files.length > 0) {
      imageFilenames = req.files.map(file => file.filename); // Fixed: consistent capitalization
    }

    const post = await Post.create({
      user: req.user.id,
      title,
      content,
      category: category || "daily",
      location,
      images: imageFilenames // Fixed: consistent capitalization
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
// export const updatePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) return res.status(404).json({ message: "Post not found" });

//     if (post.user.toString() !== req.user.id.toString()) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     post.title = req.body.title || post.title;
//     post.content = req.body.content || post.content;
//     post.category = req.body.category || post.category;
//     post.location = req.body.location || post.location;
//     post.images = imageFilenames;

//     const updatedPost = await post.save();
//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Handle new image uploads if any
    let imageFilenames = post.images || []; // Fixed: consistent capitalization
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      imageFilenames = [...imageFilenames, ...newImages]; // Fixed: consistent capitalization
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    post.location = req.body.location || post.location;
    post.images = imageFilenames; // Fixed: consistent capitalization

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

    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
