const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@atlas.local";
  const senha = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(senha, 10);
    await prisma.user.create({
      data: {
        nome: "Administrador",
        email,
        senha: hashed,
        cargo: "Admin",
        perfil: "administrador",
        status: "ativo"
      }
    });
    console.log("Admin user created:", email);
  } else {
    console.log("Admin user already exists:", email);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
