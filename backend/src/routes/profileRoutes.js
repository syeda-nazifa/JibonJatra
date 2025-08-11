import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/** GET /api/profile
 * returns current user (without password)
 */
router.get("/", auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
