# 📊 Atlas Gestão — Sistema de Gestão da Garantia da Qualidade

**Status:** ✅ Totalmente Funcional | **Tech Stack:** TypeScript + React + Node.js + PostgreSQL + Docker

Sistema completo para gestão de qualidade com autenticação JWT, CRUD de produtos, vendas, inspeções de qualidade e dashboard com estatísticas em tempo real.

---

## 🎯 Funcionalidades

### ✅ Backend (Node.js + Express + Prisma)
- 🔐 **Autenticação JWT** - Login seguro com tokens 8h
- 📦 **Gestão de Produtos** - CRUD completo com categorias e preços
- 💰 **Gestão de Vendas** - Registro de transações com itens
- 🔍 **Inspeções de Qualidade** - Controle de conformidade com ações corretivas
- 📊 **Dashboard Stats API** - Estatísticas em tempo real
- 🔒 **Middleware de Autenticação** - Proteção de rotas com JWT
- 🗄️ **PostgreSQL + Prisma ORM** - Banco de dados robusto

### ✅ Frontend (React + Vite + Tailwind CSS)
- 🎨 **Interface Responsiva** - Design moderno com Tailwind
- 🔐 **Login Seguro** - Autenticação com JWT token
- 📈 **Dashboard Interativo** - Estatísticas com cards coloridos
- 📦 **Página de Produtos** - Listar, criar, editar e deletar
- 💳 **Página de Vendas** - Gerenciar vendas com modais
- ✅ **Página de Inspeções** - Controle de qualidade com status
- 🧭 **Navigation Bar** - Menu com links ativos destacados
- 💾 **Persistência** - LocalStorage para manter sessão

---

## 🚀 Quick Start

### **Com Docker (Recomendado)**

```bash
# 1. Clone o repositório
git clone https://github.com/Hellen0987/Atlas-GQ.git
cd Atlas-GQ

# 2. Copie os arquivos de configuração
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Inicie todos os serviços
docker-compose up --build
```

**Acesso após iniciar:**
- 🌐 **Frontend:** http://localhost:5173
- 🔌 **Backend API:** http://localhost:4000/api
- 🗄️ **PostgreSQL:** localhost:5432 (atlas / atlas_password)

**Login Default:**
```
Email: admin@atlas.local
Senha: admin123
```

---

## 💻 Instalação Local (sem Docker)

### **Backend**
```bash
cd backend

# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Configurar banco de dados local
cp .env.example .env
# Editar .env com sua DATABASE_URL do PostgreSQL

# Executar migrations
npx prisma migrate dev --name init

# Seed do admin
node prisma/seed.js

# Iniciar servidor
npm run dev
```

### **Frontend**
```bash
cd frontend

# Instalar dependências
npm install

# Ajustar URL da API (opcional)
cp .env.example .env
# VITE_API_URL=http://localhost:4000/api

# Iniciar dev server
npm run dev
```

---

## 📡 API Endpoints

### **Autenticação** 🔐
```http
POST   /api/auth/register     # Registrar novo usuário
POST   /api/auth/login        # Login (retorna JWT token)
```

### **Produtos** 📦
```http
GET    /api/products          # Listar todos os produtos
POST   /api/products          # Criar novo produto
GET    /api/products/:id      # Obter produto específico
PUT    /api/products/:id      # Atualizar produto
DELETE /api/products/:id      # Deletar produto
```

### **Vendas** 💳
```http
GET    /api/sales             # Listar todas as vendas
POST   /api/sales             # Criar nova venda
GET    /api/sales/:id         # Obter venda específica
PUT    /api/sales/:id         # Atualizar venda
DELETE /api/sales/:id         # Deletar venda
```

### **Inspeções** ✅
```http
GET    /api/inspections       # Listar todas as inspeções
POST   /api/inspections       # Criar nova inspeção
GET    /api/inspections/:id   # Obter inspeção específica
PUT    /api/inspections/:id   # Atualizar inspeção
DELETE /api/inspections/:id   # Deletar inspeção
```

### **Dashboard** 📊
```http
GET    /api/stats             # Estatísticas (total produtos, vendas, estoque baixo)
GET    /health                # Health check
```

---

## 📁 Estrutura do Projeto

```
Atlas-GQ/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts        # Login e registro
│   │   │   ├── productController.ts     # CRUD de produtos
│   │   │   ├── saleController.ts        # CRUD de vendas
│   │   │   └── inspectionController.ts  # CRUD de inspeções
│   │   ├── routes/
│   │   │   ├── auth.ts                  # Rotas de autenticação
│   │   │   ├── product.ts               # Rotas de produtos
│   │   │   ├── sales.ts                 # Rotas de vendas
│   │   │   └── inspection.ts            # Rotas de inspeções
│   │   ├── middleware/
│   │   │   └── auth.ts                  # JWT verification
│   │   ├── database/
│   │   │   └── prismaClient.ts          # Prisma client initialization
│   │   └── server.ts                    # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma                # Database models
│   │   └── seed.js                      # Initialize admin user
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx                # Login page
│   │   │   ├── Dashboard.tsx            # Dashboard com stats
│   │   │   ├── Products.tsx             # Gestão de produtos
│   │   │   ├── Sales.tsx                # Gestão de vendas
│   │   │   └── Inspections.tsx          # Gestão de inspeções
│   │   ├── components/
│   │   │   ├── ProductForm.tsx          # Modal de produtos
│   │   │   ├── SaleForm.tsx             # Modal de vendas
│   │   │   └── InspectionForm.tsx       # Modal de inspeções
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx          # Auth state management
│   │   ├── services/
│   │   │   └── api.ts                   # Axios client com JWT
│   │   ├── styles/
│   │   │   └── index.css                # Global styles + Tailwind
│   │   ├── main.tsx                     # App routing
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.cjs
│   └── index.html
│
├── docker-compose.yml                  # Orquestra 3 serviços
└── README.md
```

---

## 🔧 Variáveis de Ambiente

### **Backend (.env)**
```env
# Database
DATABASE_URL="postgresql://atlas:atlas_password@db:5432/atlasdb?schema=public"

# JWT Secret
JWT_SECRET="sua_chave_super_segura_aqui"

# Server
PORT=4000

# Admin (opcional, para customizar na primeira execução)
ADMIN_EMAIL="admin@atlas.local"
ADMIN_PASSWORD="admin123"
```

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:4000/api
```

---

## 📊 Models de Dados (Prisma Schema)

### **User**
```prisma
model User {
  id: Int (primary key)
  nome: String
  email: String (unique)
  senha: String (hashed)
  cargo: String?
  perfil: String (default: "funcionario")
  status: String (default: "ativo")
  vendas: Sale[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### **Product**
```prisma
model Product {
  id: Int (primary key)
  codigo: String (unique)
  nome: String
  categoria: String?
  descricao: String?
  estoque: Int
  estoque_min: Int
  preco_compra: Float
  preco_venda: Float
  fornecedor_id: Int?
  imagem: String?
  status: String ("ativo" | "inativo")
  itensVenda: SaleItem[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### **Sale**
```prisma
model Sale {
  id: Int (primary key)
  cliente: String?
  data: DateTime
  valorTotal: Float
  formaPagamento: String?
  vendedorId: Int?
  vendedor: User?
  itens: SaleItem[]
}
```

### **Inspection**
```prisma
model Inspection {
  id: Int (primary key)
  produtoId: Int
  lote: String?
  responsavel: String?
  resultado: String
  conforme: Boolean
  descricao: String?
  acaoCorretiva: String?
  status: String ("aberto" | "fechado")
  data: DateTime
}
```

---

## 🔐 Segurança

✅ **JWT Token**
- Tokens com expiração de 8 horas
- Armazenado em localStorage no cliente
- Enviado em header `Authorization: Bearer {token}`
- Verificação em todas as rotas protegidas

✅ **Senhas**
- Hashed com bcrypt (salt rounds: 10)
- Nunca armazenadas em plain text
- Validação no login

✅ **CORS**
- Habilitado para frontend em desenvolvimento
- Proteção contra requisições não autorizadas

✅ **Middleware de Autenticação**
- Verifica JWT em rotas protegidas
- Retorna 401 se inválido ou expirado
- Refresh automático de tokens no frontend

---

## 📝 Scripts Úteis

### **Backend**
```bash
npm run dev              # Inicia servidor em desenvolvimento
npm run build            # Compila TypeScript
npm start                # Inicia servidor em produção
npx prisma generate      # Gera cliente Prisma
npx prisma migrate dev   # Cria migrations
npx prisma studio       # Abre Prisma Studio (GUI)
node prisma/seed.js      # Executa seed
```

### **Frontend**
```bash
npm run dev              # Inicia Vite dev server
npm run build            # Build de produção
npm run preview          # Preview do build
```

### **Docker**
```bash
docker-compose up --build          # Inicia todos os serviços
docker-compose down                # Para os serviços
docker-compose logs -f backend     # Ver logs do backend
docker-compose exec db psql -U atlas -d atlasdb  # Conectar ao DB
```

---

## 🐛 Troubleshooting

### **Frontend não conecta ao backend**
- Verifique se `VITE_API_URL` no `.env` está correto
- Confirme se backend está rodando em `localhost:4000`
- Limpe cache do navegador (Ctrl+Shift+Del)

### **Erro 401 - Unauthorized**
- Token expirou, faça login novamente
- Confirme JWT_SECRET do backend
- Verifique se token está sendo enviado em Authorization header

### **Banco de dados não conecta**
- Aguarde PostgreSQL inicializar (30-60 segundos)
- Verifique DATABASE_URL no `.env`
- Confirme credenciais do Postgres

### **Migrations falhando**
```bash
npx prisma migrate resolve --rolled-back "migration_name"
npx prisma migrate dev --name init
```

---

## 📦 Stack Tecnológico

**Backend:**
- Node.js 18 + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- CORS

**Frontend:**
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router v6
- Framer Motion
- Chart.js

**DevOps:**
- Docker + Docker Compose
- Nginx (reverse proxy frontend)
- PostgreSQL 15

---

## 📄 Licença

MIT License - Veja LICENSE.md para detalhes

---

## 👨‍💻 Desenvolvido por

**Hellen0987** - [GitHub Profile](https://github.com/Hellen0987)

---

## 💡 Próximas Features (Roadmap)

- [ ] Relatórios em PDF
- [ ] Gráficos avançados de vendas
- [ ] Sistema de permissões por perfil
- [ ] Backup automático de banco de dados
- [ ] Notificações em tempo real (WebSocket)
- [ ] Integração com APIs de pagamento
- [ ] App mobile (React Native)

---

**Desenvolvido com ❤️ para gestão de qualidade**
