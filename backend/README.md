# Backend - Atlas Gestão

## Setup Inicial

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
```

## Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm run start        # Produção
npm run lint         # ESLint
npm run format       # Prettier
npm run type-check   # TypeScript
npm run test         # Testes
```

## Estrutura de Pastas

- `src/controllers/` - Controladores da API
- `src/routes/` - Rotas Express
- `src/services/` - Lógica de negócio
- `src/middleware/` - Middlewares (auth, validação, etc)
- `src/validators/` - Validação de dados (Zod)
- `src/utils/` - Funções utilitárias
- `prisma/` - Schema do banco de dados
