# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src
# Generate Prisma client
RUN npx prisma generate
# Build TS
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
# Install only production deps
COPY package*.json ./
RUN npm ci --only=production
# Copy built files and prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma
# Uploads dir
RUN mkdir -p /app/uploads
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 4000
CMD ["/bin/sh", "/app/entrypoint.sh"]
