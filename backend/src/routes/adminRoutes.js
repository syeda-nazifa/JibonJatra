import express from "express";
import auth from "../middleware/auth.js"; // Your existing middleware
import { deleteUser, getUserRole, updateUserRole } from "../controllers/userController.js";

const router = express.Router();

// Only admin can change roles
router.put("/role", auth("admin"), updateUserRole);

// GET /admin/users
router.get("/users", auth("admin"), getUserRole);

// DELETE /admin/user/:id
router.delete("/user/:id", auth("admin"), deleteUser);

export default router;