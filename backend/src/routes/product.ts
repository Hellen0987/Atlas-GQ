import { Router } from "express";
import { createProduct, listProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, createProduct);
router.get("/", verifyToken, listProducts);
router.get("/:id", verifyToken, getProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
