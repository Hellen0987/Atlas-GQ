import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  static async getAllProducts(companyId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { companyId },
        include: { category: true, supplier: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: { companyId } }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createProduct(
    companyId: string,
    data: any
  ) {
    return await prisma.product.create({
      data: {
        ...data,
        companyId,
      },
      include: { category: true, supplier: true },
    });
  }

  static async updateProduct(id: string, data: any) {
    return await prisma.product.update({
      where: { id },
      data,
      include: { category: true, supplier: true },
    });
  }

  static async deleteProduct(id: string) {
    return await prisma.product.delete({ where: { id } });
  }

  static async getLowStockProducts(companyId: string) {
    return await prisma.product.findMany({
      where: {
        companyId,
        quantity: {
          lte: prisma.product.fields.minQuantity,
        },
      },
      include: { category: true },
    });
  }
}
