import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  LoginUser,
} from "../controllers/users.controller.js";
import { createUserValidator } from "../validators/users.js";
import { authenticate, authorize } from "../middleware/auth.js"; // both middlewares

const router = express.Router();

// 🔑 Login (no middleware needed)
router.post("/login", LoginUser);

// ✅ Protect all routes after this
// router.use(authenticate);

// 👤 Only Admin can onboard new users
router.post(
  "/create-user",
  authenticate,
  authorize(["create_user"]),
  createUserValidator,
  createUser
);

// 📋 Other operations with role-based permissions
router.get("/", authorize(["view_reports"]), getUsers);
router.get("/:id", authorize(["view_reports"]), getUserById);
router.put("/:id", authorize(["create_user"]), updateUser);
router.delete("/:id", authorize(["create_user"]), deleteUser);

export default router;
