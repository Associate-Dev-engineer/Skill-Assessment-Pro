import { body } from "express-validator";

export const createPermissionValidator = [
  body("name")
    .notEmpty()
    .withMessage("Permission name is required")
    .isLength({ min: 3 })
    .withMessage("Permission name must be at least 3 chars long"),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description too long (max 200 chars)"),
];
