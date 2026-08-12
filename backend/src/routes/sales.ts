import { Router } from "express";
import { createSale, listSales, getSale, updateSale, deleteSale } from "../controllers/saleController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, createSale);
router.get("/", verifyToken, listSales);
router.get("/:id", verifyToken, getSale);
router.put("/:id", verifyToken, updateSale);
router.delete("/:id", verifyToken, deleteSale);

export default router;
