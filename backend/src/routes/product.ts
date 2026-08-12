import { Router } from "express";
import {
  createProduct, listProducts, getProduct, updateProduct, deleteProduct
} from "../controllers/productController";
import { requireAuth } from "../middleware/auth";
import { upload } from "../middleware/multer";

const router = Router();

router.get("/", requireAuth, listProducts);
router.get("/:id", requireAuth, getProduct);
router.post("/", requireAuth, upload.single("imagem"), createProduct);
router.put("/:id", requireAuth, upload.single("imagem"), updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
