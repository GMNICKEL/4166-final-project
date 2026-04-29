import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const createCommentValidation = [
  body("message")
    .notEmpty()
    .withMessage("Message is required"),

  body("ticketId")
    .isInt({ min: 1 })
    .withMessage("Ticket id must be a positive integer"),

  handleValidationErrors,
];

export const updateCommentValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Comment id must be a positive integer"),

  body("message")
    .notEmpty()
    .withMessage("Message is required"),

  handleValidationErrors,
];

export const commentIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Comment id must be a positive integer"),

  handleValidationErrors,
];