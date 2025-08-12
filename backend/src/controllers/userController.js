import User from "../models/User.js";

export const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  const allowedRoles = ["resident", "shopkeeper", "service provider", "homeowner", "admin"];
  if (!allowedRoles.includes(role)) return res.status(400).json({ message: "Invalid role" });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = role;
    await user.save();
    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserRole = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};