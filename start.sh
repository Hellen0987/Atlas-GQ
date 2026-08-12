#!/bin/bash
set -e

echo "========================================"
echo "🚀 Atlas Gestão - Iniciando Setup"
echo "========================================"

# Criar arquivo .env se não existir
if [ ! -f backend/.env ]; then
    echo "📝 Criando backend/.env"
    cp backend/.env.example backend/.env
    echo "DATABASE_URL=\"postgresql://atlas:atlas_password@db:5432/atlasdb?schema=public\"" >> backend/.env
    echo "JWT_SECRET=\"atlas_jwt_secret_key_2026\"" >> backend/.env
    echo "PORT=4000" >> backend/.env
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Criando frontend/.env"
    cp frontend/.env.example frontend/.env
    echo "VITE_API_URL=/api" >> frontend/.env
fi

echo "✅ Arquivos de configuração criados!"
echo ""
echo "========================================"
echo "🐳 Iniciando Docker Compose"
echo "========================================"
echo ""
echo "⏳ Aguarde 2-3 minutos para inicialização"
echo "   - PostgreSQL inicializando..."
echo "   - Backend compilando..."
echo "   - Frontend buildando..."
echo ""

docker-compose up --build
