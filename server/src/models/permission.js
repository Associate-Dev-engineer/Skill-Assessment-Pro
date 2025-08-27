// models/permission.model.js
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true }, // e.g. create_user
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("permissions", permissionSchema);
