import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  handleValidationErrors,
];

export const updateCategoryValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Category id must be a positive integer"),

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  handleValidationErrors,
];

export const categoryIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Category id must be a positive integer"),

  handleValidationErrors,
];