import { Request, Response } from "express";
import prisma from "../database/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function register(req: Request, res: Response) {
  const { nome, email, senha, cargo, perfil } = req.body;
  if (!email || !senha || !nome) return res.status(400).json({ message: "Dados incompletos" });
  const hashed = await bcrypt.hash(senha, 10);
  try {
    const user = await prisma.user.create({
      data: { nome, email, senha: hashed, cargo, perfil }
    });
    return res.json({ id: user.id, email: user.email, nome: user.nome });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ message: "Dados incompletos" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });
  const ok = await bcrypt.compare(senha, user.senha);
  if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });
  const token = jwt.sign({ id: user.id, email: user.email, perfil: user.perfil }, JWT_SECRET, { expiresIn: "8h" });
  return res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil } });
}
