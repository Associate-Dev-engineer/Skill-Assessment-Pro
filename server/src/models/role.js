// src/models/role.model.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permissions", // links to Permission model
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("roles", roleSchema);
