import { Request, Response } from "express";
import prisma from "../database/prismaClient";

export async function createSale(req: Request, res: Response) {
  const { cliente, data, valorTotal, formaPagamento, vendedorId, itens } = req.body;
  try {
    const sale = await prisma.sale.create({
      data: {
        cliente,
        data: new Date(data),
        valorTotal: parseFloat(valorTotal || 0),
        formaPagamento,
        vendedorId: vendedorId ? parseInt(vendedorId) : null,
        itens: {
          create: itens?.map((item: any) => ({
            produtoId: parseInt(item.produtoId),
            quantidade: parseInt(item.quantidade),
            valorUnitario: parseFloat(item.valorUnitario)
          })) || []
        }
      },
      include: { itens: true }
    });
    res.json(sale);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function listSales(req: Request, res: Response) {
  try {
    const sales = await prisma.sale.findMany({
      include: { vendedor: true, itens: { include: { produto: true } } },
      orderBy: { data: "desc" }
    });
    res.json(sales);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getSale(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: { vendedor: true, itens: { include: { produto: true } } }
    });
    if (!sale) return res.status(404).json({ message: "Venda não encontrada" });
    res.json(sale);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateSale(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { cliente, data, valorTotal, formaPagamento, vendedorId } = req.body;
  try {
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        cliente,
        data: data ? new Date(data) : undefined,
        valorTotal: valorTotal ? parseFloat(valorTotal) : undefined,
        formaPagamento,
        vendedorId: vendedorId ? parseInt(vendedorId) : null
      },
      include: { itens: true }
    });
    res.json(sale);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteSale(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.sale.delete({ where: { id } });
    res.json({ message: "Deletado" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
