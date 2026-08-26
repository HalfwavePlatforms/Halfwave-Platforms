# Halfwave Platforms ⚡

> **Building Digital Products That Drive Growth.**  
> Enterprise-grade digital solutions: Web Platforms, Mobile Apps, AI & Machine Learning, Data Analytics, and Cloud Infrastructure.

---

## 🏗️ Repository Architecture (Meta-Grade Monorepo)

```
halfwave-platforms/
├── .github/                      # CI/CD pipelines & automated security scans
├── .vscode/                      # Standardized team workspace configuration
├── apps/                         # Deployable Applications
│   ├── api/                      # Enterprise Backend API (NestJS 11 + Prisma + Redis)
│   └── web/                      # Production Web Client (HTML5 + CSS Tokens + Vanilla JS)
├── packages/                     # Shared Internal Packages
│   ├── config-eslint/            # Shared ESLint configuration
│   ├── config-typescript/        # Shared base tsconfig presets
│   └── types/                    # Shared TypeScript types & API contracts
├── infrastructure/               # DevOps & Containerization
│   ├── docker/                   # Multi-stage Dockerfiles & docker-compose.yml
│   └── nginx/                    # Reverse proxy routing
├── docs/                         # Technical Specs & Architecture Diagrams
│   ├── ARCHITECTURE.md           # Monorepo architecture & data flow
│   ├── API_GUIDE.md              # REST API endpoints & Swagger docs
│   ├── SECURITY.md               # Secret rotation & security policies
│   └── DEPLOYMENT.md             # Production rollout guidelines
├── scripts/                      # Developer automation scripts
│   ├── dev.js                    # Concurrent dev orchestrator
│   └── verify.js                 # Workspace health checker
├── .env.example                  # Environment template (NO plain-text secrets)
├── .gitignore                    # Enterprise-grade git ignore policy
├── package.json                  # Root monorepo workspace scripts
└── pnpm-workspace.yaml           # pnpm workspace definition
```

---

## 🚀 Quickstart

### Prerequisites
- **Node.js**: v20+ or v22+
- **pnpm**: v9+ (`corepack enable && corepack prepare pnpm@latest --activate`)
- **Docker** (optional for local DB & Redis): Docker Desktop

### 1. Clone & Configure Environment
```bash
# Clone the repository
git clone https://github.com/HalfwavePlatforms/Halfwave-Platforms.git
cd Halfwave-Platforms

# Create local environment configuration from template
cp .env.example .env
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Generate Prisma Database Client
```bash
npm run prisma:generate
```

### 4. Run Both Applications
```bash
# Runs Web Client (5173) and Backend API (3000) concurrently
npm run dev
```

| Service | Port / URL | Description |
| :--- | :--- | :--- |
| **Web Client** | [`http://localhost:5173`](http://localhost:5173) | Frontend application |
| **Backend API** | [`http://localhost:3000`](http://localhost:3000) | NestJS Enterprise API |
| **Swagger API Docs** | [`http://localhost:3000/api/v1/docs`](http://localhost:3000/api/v1/docs) | Interactive OpenAPI documentation |

---

## 🛠️ Monorepo Scripts Reference

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Run all applications concurrently in development mode |
| `npm run start:api` | Run NestJS backend with watch mode on port 3000 |
| `npm run start:web` | Run Web client on port 5173 |
| `npm run build` | Build all packages and applications |
| `npm run lint` | Run ESLint across all projects |
| `npm run test` | Run unit and e2e test suites |
| `npm run verify` | Verify monorepo directory integrity and secrets isolation |
| `npm run docker:up` | Spin up Postgres, Redis, API, and Web in Docker |

---

## 🔒 Security Policy
- **Secrets Isolation**: Real `.env` files are strictly excluded from Git.
- **Key Rotation**: Refer to [docs/SECURITY.md](docs/SECURITY.md) for secret rotation guidelines.

---

## 📄 License
UNLICENSED &copy; 2026 Halfwave Platforms, Inc. All rights reserved.
