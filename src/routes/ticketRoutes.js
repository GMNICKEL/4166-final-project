import express from "express";
import {
  createTicketHandler,
  getAllTicketsHandler,
  getTicketByIdHandler,
  updateTicketHandler,
  deleteTicketHandler,
} from "../controllers/ticketController.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  createTicketValidation,
  updateTicketValidation,
  ticketIdValidation,
} from "../middleware/ticketValidators.js";

const router = express.Router();

router.post("/", authenticate, createTicketValidation, createTicketHandler);
router.get("/", authenticate, getAllTicketsHandler);
router.get("/:id", authenticate, ticketIdValidation, getTicketByIdHandler);
router.put("/:id", authenticate, updateTicketValidation, updateTicketHandler);
router.delete("/:id", authenticate, ticketIdValidation, deleteTicketHandler);

export default router;