import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SaleService {
  static async createSale(companyId: string, sellerId: string, data: any) {
    return await prisma.$transaction(async (tx) => {
      // Validar estoque
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product || product.quantity < item.quantity) {
          throw new Error(`Estoque insuficiente para ${product?.name}`);
        }
      }

      // Calcular totais
      let subtotal = 0;
      for (const item of data.items) {
        subtotal += item.price * item.quantity;
      }
      const total = subtotal - (data.discount || 0) + (data.tax || 0);

      // Criar venda
      const sale = await tx.sale.create({
        data: {
          number: `VENDA-${Date.now()}`,
          customerId: data.customerId,
          sellerId,
          companyId,
          paymentMethod: data.paymentMethod,
          subtotal,
          discount: data.discount || 0,
          tax: data.tax || 0,
          total,
          status: "completed",
          paymentStatus: data.paymentStatus || "pending",
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity,
            })),
          },
        },
        include: { items: true, customer: true },
      });

      // Baixar estoque
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        // Registrar movimento de estoque
        await tx.stockMovement.create({
          data: {
            type: "venda",
            quantity: item.quantity,
            reference: sale.id,
            productId: item.productId,
            companyId,
          },
        });
      }

      // Criar transação financeira
      if (data.customerId) {
        await tx.financialTransaction.create({
          data: {
            type: "receita",
            category: "venda",
            description: `Venda ${sale.number}`,
            amount: total,
            status: data.paymentStatus || "pending",
            saleId: sale.id,
            customerId: data.customerId,
            companyId,
          },
        });
      }

      // Registrar auditoria
      await tx.auditLog.create({
        data: {
          action: "create",
          entity: "Sale",
          entityId: sale.id,
          userId: sellerId,
          companyId,
        },
      });

      return sale;
    });
  }

  static async getSaleById(id: string) {
    return await prisma.sale.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        customer: true,
        seller: true,
      },
    });
  }

  static async getAllSales(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        where: { companyId },
        include: { customer: true, seller: true, items: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.sale.count({ where: { companyId } }),
    ]);

    return {
      sales,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async cancelSale(saleId: string, companyId: string, userId: string) {
    return await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { id: saleId },
        include: { items: true },
      });
      if (!sale) throw new Error("Venda não encontrada");

      // Devolver estoque
      for (const item of sale.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });

        // Registrar movimento de devolução
        await tx.stockMovement.create({
          data: {
            type: "devolucao",
            quantity: item.quantity,
            reference: saleId,
            productId: item.productId,
            companyId,
          },
        });
      }

      // Atualizar venda
      const updatedSale = await tx.sale.update({
        where: { id: saleId },
        data: { status: "cancelled" },
      });

      // Registrar auditoria
      await tx.auditLog.create({
        data: {
          action: "update",
          entity: "Sale",
          entityId: saleId,
          userId,
          companyId,
          changes: { status: { old: sale.status, new: "cancelled" } },
        },
      });

      return updatedSale;
    });
  }
}
