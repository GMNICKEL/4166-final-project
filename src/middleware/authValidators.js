import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const signupValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("role")
    .optional()
    .isIn(["USER", "SUPPORT"])
    .withMessage("Role must be USER or SUPPORT"),

  handleValidationErrors,
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];