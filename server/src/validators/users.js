import { body } from "express-validator";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Role must be a valid ObjectId"),
];
