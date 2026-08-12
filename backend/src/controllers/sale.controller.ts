import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { SaleService } from "../services/sale.service";

export class SaleController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const sale = await SaleService.createSale(req.user.companyId, req.user.id, req.body);
      res.status(201).json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const page = parseInt(req.query.page as string) || 1;
      const result = await SaleService.getAllSales(req.user.companyId, page);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const sale = await SaleService.getSaleById(id);
      res.json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async cancel(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const { id } = req.params;
      const sale = await SaleService.cancelSale(id, req.user.companyId, req.user.id);
      res.json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
