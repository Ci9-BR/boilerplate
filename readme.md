# Ci9 Zenith Boilerplate: Production-Grade NestJS 🚀🏗️

Welcome to the **Ci9 Zenith Boilerplate**, an elite, security-hardened foundation for high-scale NestJS microservices. This is not just a template; it's a living infrastructure platform built for 2026 standards.

---

## 🛡️ The Ci9 Iron Dome (Security & Governance)
This project enforces a zero-vulnerability policy and strict architectural standards:
- **NestJS v11+**: Built on the absolute latest stable core.
- **Node 24 Ready**: CI pipelines use the modern JavaScript runtime standard.
- **Surgical Security Overrides**: Transitive vulnerabilities (Ajv, Glob, Tar, Minimatch) are neutralized at the infrastructure level.
- **Strict Linting & SOLID**: ESLint 9 and SonarJS enforce elite code quality and architectural patterns.
- **Conventional Commits**: Every change is checked via `commitlint` for a professional history.

---

## 📦 Living Infrastructure (Self-Updating)
This boilerplate evolves. Downstream services can stay synchronized with our core security and architectural improvements:

### 1. Initial Setup (One-time)
If you created this project from a template or clone, link it to the core boilerplate:
```bash
npm run bp:init
```

### 2. Infrastructure Updates
Periodically sync the project's security gates, rules, and CI configurations:
```bash
npm run bp:update
```

---

## 🚀 Technical Guide

### Installation
```bash
npm install
```

### Development
```bash
npm run start:dev        # Start with watch mode
npm run lint             # Run strict code quality audit
```

### Testing (TDD & Quality Gates)
We enforce high coverage to ensure reliability:
```bash
npm run test:unit        # Logic verification (Min. 85% coverage)
npm run test:integrated  # Integration flows (Min. 80% coverage)
npm run test:e2e         # Browser/End-to-End verification (Playwright)
```

### Infrastructure & Deployment
```bash
npm run infra            # Spin up Docker dependencies
npm run build            # Production-ready build
npm run stop             # Tear down local infrastructure
```

---

## 🚦 Professional Commit Protocol (Git Hooks)
This project uses **Husky** and **Commitlint** to enforce elite engineering standards before code reaches the repository.

### Conventional Commits
Every commit message must follow the `type: description` pattern. Valid types:
- `feat`: A new feature or functionality.
- `fix`: A bug fix.
- `chore`: Maintenance tasks, infrastructure, or dependency updates (e.g., node version).
- `docs`: Changes to documentation only.

### Automation
- **Pre-commit**: Automatically runs `lint-staged` to ensure only clean code is committed.
- **Commit-msg**: Validates the message format against the standards above.
- **Pre-push**: Runs unit tests to prevent breaking the CI Logic Gate.

---

## 🌍 Globalization & Accessibility
- **i18next Ready**: Full internationalization support (Defaults: PT-BR).
- **Swagger Documentation**: Always accessible at `/doc` for API exploration.

---

## 💎 Elite Standards Checklist
- [x] Functional implementations only (No stale mocks).
- [x] Structured logs in `storage/logs`.
- [x] All generated files isolated in `storage/`.
- [x] 100% English code & comments.
- [x] Versioned API paths.

---

**Built with Elite Rigor by Ci9-BR** 🏅🏁🏆
