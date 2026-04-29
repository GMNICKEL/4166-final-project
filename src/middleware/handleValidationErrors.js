import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(function (error) {
        return {
          field: error.path,
          message: error.msg,
        };
      }),
    });
  }

  next();
}