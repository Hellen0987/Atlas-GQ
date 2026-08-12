import { Router } from "express";
import { SaleController } from "../controllers/sale.controller";
import { authMiddleware } from "../middleware/auth";
import { validateBody } from "../middleware/validation";
import { createSaleSchema } from "../validators/schemas";

const router = Router();

router.use(authMiddleware);

router.get("/", SaleController.getAll);
router.get("/:id", SaleController.getById);
router.post("/", validateBody(createSaleSchema), SaleController.create);
router.post("/:id/cancel", SaleController.cancel);

export default router;
