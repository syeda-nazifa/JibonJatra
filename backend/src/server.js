import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

import postRoutes from "./routes/postRoutes.js";  // added this line

import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();

// Basic middlewares
app.use(cors({ origin: "http://localhost:3000" })); // adjust origin as needed
app.use(express.json());

// Connect DB
await connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/posts", postRoutes);  // added this line

app.use("/api/admin", adminRoutes);


// Health check
app.get("/", (req, res) => res.send("Running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
