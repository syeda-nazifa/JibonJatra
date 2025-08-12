import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/** POST /api/auth/register
 * body: { name, email, password }
 * returns: { token }
 */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(role);
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email and password are required." });

  try {
    // Prevent duplicate email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use." });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashed, role });

    // Create JWT (keep minimal info)
    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});
/** POST /api/auth/login
 * body: { email, password }
 * returns: { token }
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email Not Found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Password Didn't Match" });

    const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;