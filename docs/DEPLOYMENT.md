# Halfwave Platforms - Deployment Guide

## 1. Local Development
```bash
# Install all workspace dependencies
pnpm install

# Generate Prisma database client
pnpm --filter @halfwave/api prisma:generate

# Start all services concurrently
npm run dev
```

---

## 2. Docker Deployment (Full Stack)
```bash
cd infrastructure/docker
docker-compose up -d --build
```
This automatically spins up:
- PostgreSQL (`5432`)
- Redis (`6379`)
- NestJS API (`3000`)
- Web Client (`5173`)

---

## 3. Production Cloud Deployment Options

### Backend API (`apps/api`)
- **Render / Railway / AWS ECS / DigitalOcean App Platform**
- Environment variables: Set `NODE_ENV=production`, `DATABASE_URL`, `REDIS_HOST`, `JWT_ACCESS_SECRET`, etc.
- Build command: `pnpm --filter @halfwave/api build`
- Start command: `pnpm --filter @halfwave/api start:prod`

### Frontend Web (`apps/web`)
- **Vercel / Cloudflare Pages / AWS S3 + CloudFront / Netlify**
- Serve static files from `apps/web/` with fallback to `index.html'
