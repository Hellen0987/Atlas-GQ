import { Request, Response } from "express";
import prisma from "../database/prismaClient";

export async function createProduct(req: Request, res: Response) {
  const {
    codigo, nome, categoria, descricao,
    preco_compra, preco_venda, estoque, estoque_min, fornecedor_id, status
  } = req.body;
  const imagem = (req as any).file?.filename;
  try {
    const product = await prisma.product.create({
      data: {
        codigo,
        nome,
        categoria,
        descricao,
        preco_compra: parseFloat(preco_compra || 0),
        preco_venda: parseFloat(preco_venda || 0),
        estoque: parseInt(estoque || "0"),
        estoque_min: parseInt(estoque_min || "0"),
        fornecedor_id: fornecedor_id ? parseInt(fornecedor_id) : null,
        imagem,
        status: status || "ativo"
      }
    });
    res.json(product);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function listProducts(req: Request, res: Response) {
  const produtos = await prisma.product.findMany({ orderBy: { nome: "asc" } });
  res.json(produtos);
}

export async function getProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const produto = await prisma.product.findUnique({ where: { id } });
  if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(produto);
}

export async function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const imagem = (req as any).file?.filename;
  try {
    const data: any = { ...req.body };
    if (imagem) data.imagem = imagem;
    if (data.preco_venda) data.preco_venda = parseFloat(data.preco_venda);
    if (data.preco_compra) data.preco_compra = parseFloat(data.preco_compra);
    if (data.estoque) data.estoque = parseInt(data.estoque);
    const produto = await prisma.product.update({ where: { id }, data });
    res.json(produto);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Deletado" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
