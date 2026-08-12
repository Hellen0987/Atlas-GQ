# Atlas Gestão — Gestão Inteligente para Empresas Modernas

> ERP web completo para gestão integrada de negócios

## 📋 Sobre

Atlas Gestão é uma plataforma ERP moderna, desenvolvida com tecnologias atuais, para oferecer soluções completas de gestão empresarial.

## 🏗️ Stack Tecnológico

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router + TanStack Query
- React Hook Form + Zod
- Framer Motion + Chart.js

### Backend
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT + bcrypt
- Multer (upload de arquivos)

### Testes & Quality
- Vitest + React Testing Library
- Supertest
- ESLint + Prettier

## 📁 Estrutura do Projeto

```
atlas-gestao/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── vitest.config.ts
│
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+
- PostgreSQL 15+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd atlas-gestao

# Backend
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev

# Frontend
cd ../frontend
npm install
cp .env.example .env

# Na raiz do projeto
cd ..
```

### Desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Build

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

## 📋 Módulos Implementados

- [ ] Autenticação (Login/Logout, JWT, Recuperação de Senha)
- [ ] Dashboard (Gráficos, Estatísticas, Dados Reais)
- [ ] Produtos (CRUD, Pesquisa, Filtros, Imagens)
- [ ] Categorias (CRUD, Relacionamento com Produtos)
- [ ] Estoque (Entradas, Saídas, Ajustes, Histórico)
- [ ] Clientes (CRUD, Histórico de Vendas)
- [ ] Fornecedores (CRUD, Produtos Fornecidos)
- [ ] Vendas (Criar, Editar, Cancelar, Integração com Estoque)
- [ ] Financeiro (Receitas, Despesas, Fluxo de Caixa)
- [ ] Equipe (Funcionários, Cargos, Departamentos)
- [ ] Qualidade (Inspeções, Lotes, Ações Corretivas)
- [ ] Relatórios (PDF, Excel, CSV)
- [ ] Usuários e Permissões (RBAC)
- [ ] Notificações
- [ ] Auditoria
- [ ] Configurações
- [ ] Uploads
- [ ] PWA

## 🔐 Segurança

- JWT para autenticação
- bcrypt para hashing de senhas
- Helmet para headers de segurança
- CORS configurado
- Validação com Zod
- Rate limiting
- Variáveis de ambiente
- Sem dados sensíveis no Git

## 📝 Licença

MIT

## 👨‍💻 Desenvolvido por

Equipe de Desenvolvimento
