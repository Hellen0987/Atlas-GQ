import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardService {
  static async getDashboardStats(companyId: string) {
    const [sales, revenue, expenses, products, customers, lowStock] =
      await Promise.all([
        prisma.sale.count({
          where: { companyId, status: "completed" },
        }),
        prisma.financialTransaction.aggregate({
          where: { companyId, type: "receita", status: "completed" },
          _sum: { amount: true },
        }),
        prisma.financialTransaction.aggregate({
          where: { companyId, type: "despesa", status: "completed" },
          _sum: { amount: true },
        }),
        prisma.product.count({ where: { companyId } }),
        prisma.customer.count({ where: { companyId } }),
        prisma.product.count({
          where: {
            companyId,
            quantity: {
              lte: prisma.product.fields.minQuantity,
            },
          },
        }),
      ]);

    const revenue_total = revenue._sum.amount || 0;
    const expenses_total = expenses._sum.amount || 0;
    const profit = revenue_total - expenses_total;

    return {
      sales,
      revenue: revenue_total,
      expenses: expenses_total,
      profit,
      products,
      customers,
      lowStock,
    };
  }

  static async getSalesChart(companyId: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sales = await prisma.sale.groupBy({
      by: ["createdAt"],
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
      _count: true,
      _sum: { total: true },
    });

    return sales.map((sale) => ({
      date: sale.createdAt.toISOString().split("T")[0],
      count: sale._count,
      total: sale._sum.total || 0,
    }));
  }

  static async getFinancialChart(companyId: string, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const transactions = await prisma.financialTransaction.groupBy({
      by: ["type", "createdAt"],
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
      _sum: { amount: true },
    });

    return transactions.map((t) => ({
      date: t.createdAt.toISOString().split("T")[0],
      type: t.type,
      amount: t._sum.amount || 0,
    }));
  }
}
