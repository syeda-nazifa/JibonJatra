import Service from "../models/Service.js";

/**
 * Create a new service (shopkeeper)
 * Accepts:
 * - JSON fields in body
 * - Optional file upload (req.file) for servicePicture
 * - Or client may send a direct URL in req.body.servicePicture
 */
export const createService = async (req, res) => {
  try {
    const body = { ...req.body };

    // If multer uploaded a file, override servicePicture with local path
    if (req.file) {
      body.servicePicture = `/uploads/services/${req.file.filename}`;
    }

    const service = await Service.create({
      ...body,
      createdBy: req.user.id,
    });

    res.status(201).json(service);
  } catch (err) {
    console.error("createService error:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
};

/**
 * Get services (public)
 * Supports optional query params: ?q=plumber&type=premium&min=0&max=500&sort=-createdAt&page=1&limit=10
 */
export const getServices = async (req, res) => {
  try {
    const {
      q,
      type,
      min,
      max,
      sort = "-createdAt",
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { providerName: { $regex: q, $options: "i" } },
        { serviceName: { $regex: q, $options: "i" } },
        { serviceDetail: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }
    if (type) filter.serviceType = type;
    if (min || max) {
      filter.servicePrice = {};
      if (min) filter.servicePrice.$gte = Number(min);
      if (max) filter.servicePrice.$lte = Number(max);
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Service.find(filter)
        .populate("createdBy", "name email role")
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      Service.countDocuments(filter),
    ]);

    res.json({
      items,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error("getServices error:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
  try {
    const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const skip = (page - 1) * limit;
    let sortOptions = {};
    
    switch (sortBy) {
      case 'priceLow':
        sortOptions = { price: 1 };
        break;
      case 'priceHigh':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { ratingAverage: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }
    
    const services = await Service.find(query)
      .populate('provider', 'name profilePicture')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Service.countDocuments(query);
    
    res.json({
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single service (public)
 */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error("getServiceById error:", err);
    res.status(500).json({ error: "Failed to fetch service" });
  }
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name profilePicture email phone');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update service (owner shopkeeper or admin)
 * Accepts optional new file upload or URL
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const isOwner = service.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Merge updates
    const updates = { ...req.body };

    // If a new file was uploaded, replace path
    if (req.file) {
      updates.servicePicture = `/uploads/services/${req.file.filename}`;
    }

    Object.assign(service, updates);
    await service.save();

    res.json(service);
  } catch (err) {
    console.error("updateService error:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
};

/**
 * Delete service (owner shopkeeper or admin)
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const isOwner = service.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await service.deleteOne();
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error("deleteService error:", err);
    res.status(500).json({ error: "Failed to delete service" });
  }
};


// /**
//  * Add rating to a service
//  */
// export const addRating = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const serviceId = req.params.id;
//     const userId = req.user.id;

//     // Validate rating
//     if (!rating || rating < 1 || rating > 5) {
//       return res.status(400).json({ error: "Rating must be between 1 and 5" });
//     }

//     const service = await Service.findById(serviceId);
//     if (!service) return res.status(404).json({ error: "Service not found" });

//     // Check if user already rated this service
//     const existingRatingIndex = service.ratings.findIndex(
//       r => r.userId.toString() === userId
//     );

//     if (existingRatingIndex >= 0) {
//       // Update existing rating
//       service.ratings[existingRatingIndex].rating = rating;
//       service.ratings[existingRatingIndex].comment = comment || "";
//     } else {
//       // Add new rating
//       service.ratings.push({
//         userId,
//         rating,
//         comment: comment || "",
//         createdAt: new Date()
//       });
//     }

//     // Calculate new average rating
//     const total = service.ratings.reduce((sum, r) => sum + r.rating, 0);
//     service.averageRating = total / service.ratings.length;
//     service.totalRatings = service.ratings.length;

//     await service.save();

//     // Populate user info for response
//     await service.populate("ratings.userId", "name");

//     res.json({
//       message: "Rating added successfully",
//       averageRating: service.averageRating,
//       totalRatings: service.totalRatings,
//       userRating: rating
//     });
//   } catch (err) {
//     console.error("addRating error:", err);
//     res.status(500).json({ error: "Failed to add rating" });
//   }
// };

// /**
//  * Get ratings for a service
//  */
// export const getRatings = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id)
//       .populate("ratings.userId", "name")
//       .select("ratings averageRating totalRatings");

//     if (!service) return res.status(404).json({ error: "Service not found" });

//     res.json({
//       ratings: service.ratings,
//       averageRating: service.averageRating,
//       totalRatings: service.totalRatings
//     });
//   } catch (err) {
//     console.error("getRatings error:", err);
//     res.status(500).json({ error: "Failed to fetch ratings" });
//   }
// };

// /**
//  * Get user's rating for a service
//  */
// export const getUserRating = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ error: "Service not found" });

//     const userRating = service.ratings.find(
//       r => r.userId.toString() === req.user.id
//     );

//     res.json({ userRating: userRating || null });
//   } catch (err) {
//     console.error("getUserRating error:", err);
//     res.status(500).json({ error: "Failed to fetch user rating" });
//   }
// };
