#!/bin/sh
set -e

echo "========================================"
echo "🚀 Atlas Gestão Backend - Iniciando"
echo "========================================"

# Variables
DB_HOST=${DATABASE_HOST:-db}
DB_PORT=${DATABASE_PORT:-5432}
DB_USER=${POSTGRES_USER:-atlas}
MAX_RETRIES=30
RETRY_COUNT=0

# Function to check if database is ready
check_db() {
    nc -z $DB_HOST $DB_PORT > /dev/null 2>&1
    return $?
}

# Wait for database to be ready
echo "⏳ Aguardando PostgreSQL em $DB_HOST:$DB_PORT..."
while ! check_db; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -gt $MAX_RETRIES ]; then
        echo "❌ Timeout aguardando banco de dados"
        exit 1
    fi
    echo "   Tentativa $RETRY_COUNT/$MAX_RETRIES..."
    sleep 2
done

echo "✅ PostgreSQL está pronto!"
echo ""

# Run Prisma migrations
echo "📊 Executando migrations do Prisma..."
if [ "$NODE_ENV" = "production" ]; then
    npx prisma migrate deploy --skip-generate
else
    npx prisma migrate dev --skip-generate
fi

echo "✅ Migrations completadas!"
echo ""

# Run Prisma seed
echo "🌱 Seedando banco de dados..."
node prisma/seed.js || true
echo "✅ Seed completado!"
echo ""

echo "========================================"
echo "🚀 Iniciando servidor Express"
echo "========================================"
echo ""

exec node dist/server.js
