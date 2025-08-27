import User from "../models/users.js";
import Role from "../models/role.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config(); // env variable
// Login User
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Create User (Admin only)
export const createUser = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Check role exists
    const roleDoc = await Role.findById(role);
    if (!roleDoc) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Create user
    const newUser = new User({
      name,
      email,
      password,
      role,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: roleDoc.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// ✅ Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// ✅ Get Single User
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role", "name");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// ✅ Update User
export const updateUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (role) {
      const roleDoc = await Role.findById(role);
      if (!roleDoc) return res.status(400).json({ message: "Invalid role" });
      user.role = role;
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
