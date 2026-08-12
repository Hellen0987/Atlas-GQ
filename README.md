# Atlas Gestão — Dockerized

Este repositório contém o scaffold do Atlas Gestão (backend Node/Express/Prisma + frontend React/Vite) e um docker-compose para rodar localmente.

Serviços:
- Postgres: 5432
- Backend: 4000
- Frontend (Nginx): 5173 -> mapeado para porta 5173 (serve build na porta 80 interna)

Como rodar (Docker)
1. Copie exemplos:
   - cp backend/.env.example backend/.env
   - cp frontend/.env.example frontend/.env
   - (Opcional) ajuste credenciais no backend/.env
2. Build e up:
   - docker-compose up --build
3. Acesse:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000/api
4. Usuário admin criado por seed:
   - Email: admin@atlas.local
   - Senha: admin123
   - (Altere via env: ADMIN_EMAIL, ADMIN_PASSWORD antes do primeiro start)

Como rodar localmente (sem Docker)
- Backend:
  1. cd backend
  2. cp .env.example .env e editar (usar DATABASE_URL apontando para um Postgres local)
  3. npm install
  4. npx prisma generate
  5. npx prisma migrate dev --name init
  6. npm run dev
- Frontend:
  1. cd frontend
  2. cp .env.example .env (ajuste VITE_API_URL)
  3. npm install
  4. npm run dev

Notas
- Uploads: mapeados para ./backend/uploads e servidos via /uploads no backend
- Prisma: schema está em backend/prisma/schema.prisma (já incluído no scaffold)
