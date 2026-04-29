import express from "express";
import {
  createCommentHandler,
  getAllCommentsHandler,
  getCommentByIdHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from "../controllers/commentController.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  createCommentValidation,
  updateCommentValidation,
  commentIdValidation,
} from "../middleware/commentValidators.js";

const router = express.Router();

router.post("/", authenticate, createCommentValidation, createCommentHandler);
router.get("/", authenticate, getAllCommentsHandler);
router.get("/:id", authenticate, commentIdValidation, getCommentByIdHandler);
router.put("/:id", authenticate, updateCommentValidation, updateCommentHandler);
router.delete("/:id", authenticate, commentIdValidation, deleteCommentHandler);

export default router;