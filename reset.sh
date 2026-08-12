#!/bin/bash
echo "♻️  Resetando banco de dados..."
docker-compose down -v
echo "🗑️  Volume de dados removido"
echo "🚀 Reiniciando tudo..."
docker-compose up --build
