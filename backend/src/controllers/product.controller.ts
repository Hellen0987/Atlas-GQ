import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const page = parseInt(req.query.page as string) || 1;
      const result = await ProductService.getAllProducts(req.user.companyId, page);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const product = await ProductService.createProduct(req.user.companyId, req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      res.json({ message: "Produto deletado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getLowStock(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const products = await ProductService.getLowStockProducts(req.user.companyId);
      res.json(products);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
