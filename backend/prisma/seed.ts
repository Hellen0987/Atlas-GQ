import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create Company
    const company = await prisma.company.upsert({
      where: { cnpj: "00.000.000/0000-00" },
      update: {},
      create: {
        name: "Atlas Gestão Empresa Demo",
        cnpj: "00.000.000/0000-00",
        email: "contato@atlasdemo.com",
        phone: "(11) 98765-4321",
        address: "Rua Principal, 123",
        city: "São Paulo",
        state: "SP",
      },
    });

    // Create Admin User
    const hashedPassword = await bcrypt.hash("Admin@123456", 10);
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@atlasgestao.com" },
      update: {},
      create: {
        email: "admin@atlasgestao.com",
        password: hashedPassword,
        name: "Administrador Atlas",
        role: "ADMIN",
        status: "active",
        companyId: company.id,
      },
    });

    // Create Manager User
    const managerPassword = await bcrypt.hash("Manager@123456", 10);
    const managerUser = await prisma.user.upsert({
      where: { email: "gerente@atlasgestao.com" },
      update: {},
      create: {
        email: "gerente@atlasgestao.com",
        password: managerPassword,
        name: "Gerente Atlas",
        role: "MANAGER",
        status: "active",
        companyId: company.id,
      },
    });

    // Create Employee User
    const employeePassword = await bcrypt.hash("Employee@123456", 10);
    const employeeUser = await prisma.user.upsert({
      where: { email: "vendedor@atlasgestao.com" },
      update: {},
      create: {
        email: "vendedor@atlasgestao.com",
        password: employeePassword,
        name: "Vendedor Atlas",
        role: "EMPLOYEE",
        status: "active",
        companyId: company.id,
      },
    });

    // Create Employee record for seller
    await prisma.employee.upsert({
      where: { userId: employeeUser.id },
      update: {},
      create: {
        name: "Vendedor Atlas",
        cpf: "123.456.789-00",
        email: "vendedor@atlasgestao.com",
        phone: "(11) 98765-4321",
        department: "Vendas",
        position: "Vendedor",
        salary: 3000,
        hireDate: new Date("2023-01-15"),
        status: "active",
        userId: employeeUser.id,
        companyId: company.id,
      },
    });

    // Create Categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { companyId_name: { companyId: company.id, name: "Eletrônicos" } },
        update: {},
        create: {
          name: "Eletrônicos",
          description: "Produtos eletrônicos em geral",
          companyId: company.id,
        },
      }),
      prisma.category.upsert({
        where: { companyId_name: { companyId: company.id, name: "Roupas" } },
        update: {},
        create: {
          name: "Roupas",
          description: "Vestuário e acessórios",
          companyId: company.id,
        },
      }),
      prisma.category.upsert({
        where: { companyId_name: { companyId: company.id, name: "Alimentos" } },
        update: {},
        create: {
          name: "Alimentos",
          description: "Produtos alimentares",
          companyId: company.id,
        },
      }),
    ]);

    // Create Suppliers
    const suppliers = await Promise.all([
      prisma.supplier.upsert({
        where: { companyId_cpfCnpj: { companyId: company.id, cpfCnpj: "11.222.333/0001-81" } },
        update: {},
        create: {
          name: "Fornecedor TechWorld",
          email: "contato@techworld.com.br",
          phone: "(11) 3000-0000",
          cpfCnpj: "11.222.333/0001-81",
          address: "Av. Paulista, 1000",
          city: "São Paulo",
          state: "SP",
          status: "active",
          companyId: company.id,
        },
      }),
      prisma.supplier.upsert({
        where: { companyId_cpfCnpj: { companyId: company.id, cpfCnpj: "22.333.444/0001-90" } },
        update: {},
        create: {
          name: "Fornecedor Fashion Plus",
          email: "vendas@fashionplus.com.br",
          phone: "(11) 3100-0000",
          cpfCnpj: "22.333.444/0001-90",
          address: "Rua Augusta, 500",
          city: "São Paulo",
          state: "SP",
          status: "active",
          companyId: company.id,
        },
      }),
    ]);

    // Create Products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { companyId_code: { companyId: company.id, code: "PROD-001" } },
        update: {},
        create: {
          code: "PROD-001",
          name: "Smartphone XYZ",
          description: "Smartphone de última geração",
          price: 1500,
          costPrice: 900,
          quantity: 50,
          minQuantity: 10,
          sku: "SKU-001",
          barcode: "1234567890123",
          status: "active",
          categoryId: categories[0].id,
          supplierId: suppliers[0].id,
          companyId: company.id,
        },
      }),
      prisma.product.upsert({
        where: { companyId_code: { companyId: company.id, code: "PROD-002" } },
        update: {},
        create: {
          code: "PROD-002",
          name: "Camiseta Premium",
          description: "Camiseta 100% algodão",
          price: 89.90,
          costPrice: 35,
          quantity: 200,
          minQuantity: 50,
          sku: "SKU-002",
          barcode: "1234567890124",
          status: "active",
          categoryId: categories[1].id,
          supplierId: suppliers[1].id,
          companyId: company.id,
        },
      }),
      prisma.product.upsert({
        where: { companyId_code: { companyId: company.id, code: "PROD-003" } },
        update: {},
        create: {
          code: "PROD-003",
          name: "Notebook Intel i7",
          description: "Notebook com processador Intel i7",
          price: 4500,
          costPrice: 2800,
          quantity: 15,
          minQuantity: 5,
          sku: "SKU-003",
          barcode: "1234567890125",
          status: "active",
          categoryId: categories[0].id,
          supplierId: suppliers[0].id,
          companyId: company.id,
        },
      }),
    ]);

    // Create Customers
    const customers = await Promise.all([
      prisma.customer.upsert({
        where: { companyId_cpfCnpj: { companyId: company.id, cpfCnpj: "123.456.789-10" } },
        update: {},
        create: {
          name: "João Silva",
          email: "joao@email.com",
          phone: "(11) 99999-1111",
          cpfCnpj: "123.456.789-10",
          address: "Rua das Flores, 123",
          city: "São Paulo",
          state: "SP",
          type: "pessoa_fisica",
          status: "active",
          companyId: company.id,
        },
      }),
      prisma.customer.upsert({
        where: { companyId_cpfCnpj: { companyId: company.id, cpfCnpj: "987.654.321-00" } },
        update: {},
        create: {
          name: "Maria Santos",
          email: "maria@email.com",
          phone: "(11) 99999-2222",
          cpfCnpj: "987.654.321-00",
          address: "Av. Centrale, 456",
          city: "São Paulo",
          state: "SP",
          type: "pessoa_fisica",
          status: "active",
          companyId: company.id,
        },
      }),
    ]);

    // Create Sample Sales
    const sale1 = await prisma.sale.create({
      data: {
        number: "VENDA-001",
        status: "completed",
        paymentStatus: "completed",
        paymentMethod: "credito",
        subtotal: 1500,
        discount: 0,
        tax: 0,
        total: 1500,
        customerId: customers[0].id,
        sellerId: employeeUser.id,
        companyId: company.id,
        items: {
          create: [
            {
              quantity: 1,
              price: 1500,
              discount: 0,
              tax: 0,
              subtotal: 1500,
              productId: products[0].id,
            },
          ],
        },
      },
    });

    // Create Financial Transactions
    await prisma.financialTransaction.create({
      data: {
        type: "receita",
        category: "venda",
        description: "Venda VENDA-001",
        amount: 1500,
        status: "completed",
        paymentDate: new Date(),
        saleId: sale1.id,
        customerId: customers[0].id,
        companyId: company.id,
      },
    });

    console.log("✅ Seed executado com sucesso!");
    console.log(`🎯 Empresa: ${company.name}`);
    console.log(`👨‍💻 Admin: ${adminUser.email} | Senha: Admin@123456`);
    console.log(`👨‍💼 Manager: ${managerUser.email} | Senha: Manager@123456`);
    console.log(`👨‍📕 Employee: ${employeeUser.email} | Senha: Employee@123456`);
  } catch (error) {
    console.error("Erro no seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
