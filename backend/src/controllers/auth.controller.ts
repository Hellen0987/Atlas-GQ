import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, companyId } = req.body;
      const user = await AuthService.register(name, email, password, companyId);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async me(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autenticado" });
        return;
      }
      const user = await AuthService.getUserById(req.user.id);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
