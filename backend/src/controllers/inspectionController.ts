import { Request, Response } from "express";
import prisma from "../database/prismaClient";

export async function createInspection(req: Request, res: Response) {
  const { produtoId, lote, responsavel, resultado, conforme, descricao, acaoCorretiva, status } = req.body;
  try {
    const inspection = await prisma.inspection.create({
      data: {
        produtoId: parseInt(produtoId),
        lote,
        responsavel,
        resultado,
        conforme: conforme === true || conforme === "true",
        descricao,
        acaoCorretiva,
        status: status || "aberto"
      }
    });
    res.json(inspection);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function listInspections(req: Request, res: Response) {
  try {
    const inspections = await prisma.inspection.findMany({
      orderBy: { data: "desc" }
    });
    res.json(inspections);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getInspection(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const inspection = await prisma.inspection.findUnique({ where: { id } });
    if (!inspection) return res.status(404).json({ message: "Inspeção não encontrada" });
    res.json(inspection);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateInspection(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { lote, responsavel, resultado, conforme, descricao, acaoCorretiva, status } = req.body;
  try {
    const inspection = await prisma.inspection.update({
      where: { id },
      data: {
        lote,
        responsavel,
        resultado,
        conforme: conforme === true || conforme === "true",
        descricao,
        acaoCorretiva,
        status
      }
    });
    res.json(inspection);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteInspection(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.inspection.delete({ where: { id } });
    res.json({ message: "Deletado" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
