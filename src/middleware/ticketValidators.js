import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const createTicketValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("categoryId")
    .isInt({ min: 1 })
    .withMessage("Category id must be a positive integer"),

  handleValidationErrors,
];

export const updateTicketValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Ticket id must be a positive integer"),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Category id must be a positive integer"),

  body("status")
    .optional()
    .isIn(["PENDING", "COMPLETED"])
    .withMessage("Status must be PENDING or COMPLETED"),

  handleValidationErrors,
];

export const ticketIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Ticket id must be a positive integer"),

  handleValidationErrors,
];