#!/bin/sh
set -e

# Simple wait-for-postgres
HOST=${DATABASE_HOST:-db}
PORT=${DATABASE_PORT:-5432}
echo "Waiting for Postgres at $HOST:$PORT ..."

until nc -z $HOST $PORT; do
  echo "Postgres not ready - sleeping"
  sleep 1
done

echo "Postgres is up - running migrations"
# Run Prisma migrations (deploy for production)
npx prisma migrate deploy || npx prisma migrate deploy

# Run seed if DB has no users (prisma seed script runs below)
node ./prisma/seed.js || true

echo "Starting backend"
node dist/server.js
