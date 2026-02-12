# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NestJS API server (v11) for Brazilian CEP (postal code) lookups. Integrates with ViaCEP and Nationalize external APIs. Written in TypeScript targeting ES2023.

## Commands

```bash
# Development
npm run start:dev          # Start with file watching
npm run start:debug        # Debug mode with watching

# Build & Run
npm run build              # Compile to dist/
npm run start:prod         # Run compiled output

# Testing
npm test                   # Run unit tests (jest)
npm run test:watch         # Watch mode
npm run test:cov           # With coverage report
npm run test:e2e           # End-to-end tests (test/jest-e2e.json)
npx jest --testPathPattern=<pattern>  # Run a single test file

# Code Quality
npm run lint               # ESLint with auto-fix
npm run format             # Prettier formatting
```

## Architecture

**NestJS feature-module pattern** — each domain is a self-contained module with its own controller, service, and pipes.

- `src/main.ts` — Bootstrap; reads port from ConfigService
- `src/app.module.ts` — Root module; imports ConfigModule (global, env-aware) and CepModule
- `src/cep/` — CEP feature module:
  - `cep.controller.ts` — Two endpoints: `GET /cep/v1/:cep` (sequential) and `GET /cep/v2/:cep` (parallel via `Promise.all`)
  - `cep.service.ts` — Calls ViaCEP for address data, Nationalize for nationality prediction; handles errors with `HttpException(503)`
  - `validar-cep/validar-cep.pipe.ts` — Validation pipe enforcing 8-digit numeric format; throws `BadRequestException` with Portuguese message

## Environment Configuration

ConfigModule loads `.env.${NODE_ENV}` (defaults to `.env.development`). Key variables:

- `PORT` — Server port (default 3000)
- `VIACEP_URL` — ViaCEP API base URL
- `NATIONALIZE_URL` — Nationalize API base URL
- `LOG_LEVEL` — Logging level (debug in dev, warn in prod)

## Code Style

- Prettier: single quotes, trailing commas
- ESLint flat config (v9+): `@typescript-eslint/no-explicit-any` is off; floating promises and unsafe arguments are warnings
- Tests use `@nestjs/testing` TestingModule with Jest; E2E tests use supertest
