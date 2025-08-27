import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import userRoutes from "./src/views/users.js";
import adminRoutes from "./src/views/admin.js";

dotenv.config();

const app = express();
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Skill Assessment Pro API is running ✅");
});

// Routers
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

// Connect DB, then start server
const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      app.listen(PORT, () =>
        console.log(`🚀 Server running on http://localhost:${PORT}`)
      );
    }
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};

startServer();
