// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and populate role + permissions
    const user = await User.findById(decoded.id).populate({
      path: "role",
      populate: { path: "permissions" },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (requiredPermissions = []) => {
  return (req, res, next) => {
    try {
      const user = req.user; // from authenticate
      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const userPermissions = user.role.permissions.map((p) => p.name);

      const hasPermission = requiredPermissions.every((rp) =>
        userPermissions.includes(rp)
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }

      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Authorization error", error: error.message });
    }
  };
};
