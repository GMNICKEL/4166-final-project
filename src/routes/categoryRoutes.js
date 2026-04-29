import express from "express";
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categoryController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
} from "../middleware/categoryValidators.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("SUPPORT"), createCategoryValidation, createCategoryHandler);
router.get("/", authenticate, getAllCategoriesHandler);
router.get("/:id", authenticate, categoryIdValidation, getCategoryByIdHandler);
router.put("/:id", authenticate, authorizeRoles("SUPPORT"), updateCategoryValidation, updateCategoryHandler);
router.delete("/:id", authenticate, authorizeRoles("SUPPORT"), categoryIdValidation, deleteCategoryHandler);

export default router;