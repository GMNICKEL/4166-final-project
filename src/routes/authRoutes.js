import express from "express";
import { signupHandler, loginHandler } from "../controllers/authController.js";
import { signupValidation, loginValidation } from "../middleware/authValidators.js";

const router = express.Router();

router.post("/signup", signupValidation, signupHandler);
router.post("/login", loginValidation, loginHandler);

export default router;