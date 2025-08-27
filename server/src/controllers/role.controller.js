// src/controllers/role.controller.js
import Role from "../models/role.js";
import Permission from "../models/permission.js";

/**
 * @desc    Create a new Role
 * @route   POST /api/admin/roles
 */
export const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // check if role already exists
    const existing = await Role.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Role already exists" });
    }

    // validate permissions (if provided)
    if (permissions && permissions.length > 0) {
      const validPermissions = await Permission.find({
        _id: { $in: permissions },
      });

      if (validPermissions.length !== permissions.length) {
        return res
          .status(400)
          .json({ message: "Invalid permissions provided" });
      }
    }

    const role = await Role.create({ name, description, permissions });
    res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating role", error: error.message });
  }
};

/**
 * @desc    Get all Roles
 * @route   GET /api/admin/roles
 */
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: error.message });
  }
};

/**
 * @desc    Get Role by ID
 * @route   GET /api/admin/roles/:id
 */
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching role", error: error.message });
  }
};

/**
 * @desc    Update Role
 * @route   PUT /api/admin/roles/:id
 */
export const updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // validate permissions if provided
    if (permissions && permissions.length > 0) {
      const validPermissions = await Permission.find({
        _id: { $in: permissions },
      });
      if (validPermissions.length !== permissions.length) {
        return res
          .status(400)
          .json({ message: "Invalid permissions provided" });
      }
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description, permissions },
      { new: true, runValidators: true }
    ).populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating role", error: error.message });
  }
};

/**
 * @desc    Delete Role
 * @route   DELETE /api/admin/roles/:id
 */
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};
