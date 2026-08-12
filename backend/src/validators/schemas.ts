import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  companyId: z.string().cuid("ID da empresa inválido"),
});

export const createProductSchema = z.object({
  code: z.string().min(3),
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
  costPrice: z.number().positive(),
  minQuantity: z.number().int().nonnegative(),
  categoryId: z.string().cuid(),
  supplierId: z.string().cuid().optional(),
});

export const createCustomerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  cpfCnpj: z.string().optional(),
  address: z.string().optional(),
  type: z.enum(["pessoa_fisica", "pessoa_juridica"]),
});

export const createSaleSchema = z.object({
  customerId: z.string().cuid().optional(),
  paymentMethod: z.string().optional(),
  discount: z.number().nonnegative().default(0),
  items: z.array(
    z.object({
      productId: z.string().cuid(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});
