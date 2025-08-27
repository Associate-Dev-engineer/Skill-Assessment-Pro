import Permission from "../models/permission.js";
import { validationResult } from "express-validator";

// ✅ Create Permission
export const createPermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let permissions = req.body;

    // Ensure it's always an array
    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }

    if (!permissions.length) {
      return res.status(400).json({ message: "Permissions array is required" });
    }

    // Check duplicates in DB
    const names = permissions.map((p) => p.name);
    const existing = await Permission.find({ name: { $in: names } });

    const existingNames = existing.map((e) => e.name);
    const newPermissions = permissions.filter(
      (p) => !existingNames.includes(p.name)
    );

    if (!newPermissions.length) {
      return res.status(409).json({ message: "All permissions already exist" });
    }

    const created = await Permission.insertMany(newPermissions);

    res.status(201).json({
      message: "Permissions created successfully",
      created,
      skipped: existingNames,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating permissions",
      error: error.message,
    });
  }
};

// ✅ Get All Permissions
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching permissions", error: error.message });
  }
};

// ✅ Get Single Permission
export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.json(permission);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching permission", error: error.message });
  }
};

// ✅ Update Permission
export const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = await Permission.findById(req.params.id);

    if (!permission)
      return res.status(404).json({ message: "Permission not found" });

    if (name) permission.name = name;
    if (description) permission.description = description;

    await permission.save();
    res.json({ message: "Permission updated successfully", permission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating permission", error: error.message });
  }
};

// ✅ Delete Permission
export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.json({ message: "Permission deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting permission", error: error.message });
  }
};
