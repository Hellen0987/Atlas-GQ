import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware, requireRole } from "../middleware/auth";
import { validateBody } from "../middleware/validation";
import { createProductSchema } from "../validators/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", ProductController.getAll);
router.get("/low-stock", ProductController.getLowStock);
router.post("/", validateBody(createProductSchema), ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", requireRole("ADMIN", "MANAGER"), ProductController.delete);

export default router;
