import express from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permission.controller.js";

import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";

// import { authorize } from "../middleware/auth.js";
// import { createPermissionValidator } from "../validators/permission.js";

const router = express.Router();

/* ========================
   PERMISSION ROUTES
======================== */

// All permissions (list + create)
router
  .route("/permissions")
  .post(
    // authorize(["manage_permissions"]),
    // createPermissionValidator,
    createPermission
  )
  .get(
    // authorize(["view_permissions"]),
    getPermissions
  );

// Single permission
router
  .route("/permissions/:id")
  .get(
    // authorize(["view_permissions"]),
    getPermissionById
  )
  .put(
    // authorize(["manage_permissions"]),
    updatePermission
  )
  .delete(
    // authorize(["manage_permissions"]),
    deletePermission
  );

/* ========================
   ROLE ROUTES
======================== */

// All roles (list + create)
router
  .route("/roles")
  .post(
    // authorize(["manage_roles"]),
    createRole
  )
  .get(
    // authorize(["view_roles"]),
    getRoles
  );

// Single role
router
  .route("/roles/:id")
  .get(
    // authorize(["view_roles"]),
    getRoleById
  )
  .put(
    // authorize(["manage_roles"]),
    updateRole
  )
  .delete(
    // authorize(["manage_roles"]),
    deleteRole
  );

export default router;
