import { Router } from "express";
import { createInspection, listInspections, getInspection, updateInspection, deleteInspection } from "../controllers/inspectionController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/", verifyToken, createInspection);
router.get("/", verifyToken, listInspections);
router.get("/:id", verifyToken, getInspection);
router.put("/:id", verifyToken, updateInspection);
router.delete("/:id", verifyToken, deleteInspection);

export default router;
