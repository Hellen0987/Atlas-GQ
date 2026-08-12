import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/stats", DashboardController.getStats);
router.get("/sales-chart", DashboardController.getSalesChart);
router.get("/financial-chart", DashboardController.getFinancialChart);

export default router;
