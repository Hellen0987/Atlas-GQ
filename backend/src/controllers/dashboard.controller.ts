import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  static async getStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const stats = await DashboardService.getDashboardStats(req.user.companyId);
      res.json(stats);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getSalesChart(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const days = parseInt(req.query.days as string) || 30;
      const chart = await DashboardService.getSalesChart(req.user.companyId, days);
      res.json(chart);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getFinancialChart(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const days = parseInt(req.query.days as string) || 30;
      const chart = await DashboardService.getFinancialChart(req.user.companyId, days);
      res.json(chart);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
