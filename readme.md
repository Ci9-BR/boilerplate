# Professional NestJS Backend Boilerplate

A robust, production-ready backend boilerplate built with NestJS, Prisma, and AWS integrations, following extreme code quality and observability standards.

## Prerequisites

- Node.js (v20 or v22)
- Docker & Docker Compose
- PostgreSQL (Local or Docker)

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and adjust the values:

```bash
cp .env.example .env
```

### 3. Infrastructure (LocalStack & Postgres)

Start the local infrastructure using the shortcut:

```bash
npm run infra
```

### 4. Database Setup

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

- **Swagger UI**: `http://localhost:3000/doc`
- **Root Greeting**: `http://localhost:3000/v1`
- **Health Check (Liveness)**: `http://localhost:3000/v1/health`
- **Ready Check (Readiness)**: `http://localhost:3000/v1/health/ready`

## Quality Control (Quality Gates)

This project uses **Husky** and **Commitlint** to ensure absolute quality:

- **Commits**: Must follow [Conventional Commits](https://www.conventionalcommits.org/).
- **Pre-Push**: Automatically runs `lint`, `unit tests` (>85%), and `integrated tests` (>80%).

```bash
# Run Unit Tests
npm run test:unit

# Run Integrated Tests
npm run test:integrated

# Run E2E Tests
npm run test:e2e

# Run Linter
npm run lint
```

## Features

- **Extreme Type Safety**: Blocked use of `any` via strict ESLint rules.
- **Provider Abstraction**: All providers (S3, SQS, SNS, DynamoDB, OpenAI, SecretsManager) extend `BaseProvider` for centralized logging and telemetry.
- **Observability**: Built-in health checks and telemetry hooks.
- **I18n**: Mandatory internationalization (default: `pt-BR`).
- **CI/CD**: GitHub Actions pipeline configured in `.github/workflows/ci.yml`.
- **Auto-versioning**: Semantic Release configured for automated releases.
