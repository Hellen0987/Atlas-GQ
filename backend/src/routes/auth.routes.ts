import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
import { validateBody } from "../middleware/validation";
import { loginSchema, registerSchema } from "../validators/schemas";

const router = Router();

router.post("/login", validateBody(loginSchema), AuthController.login);
router.post("/register", validateBody(registerSchema), AuthController.register);
router.get("/me", authMiddleware, AuthController.me);

export default router;
