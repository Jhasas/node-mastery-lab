# Node Mastery Lab

Personal reference repository for exploring Node.js and NestJS concepts. Built as a hands-on lab to study patterns like modular architecture, parallel HTTP requests, environment-based configuration, input validation pipes, and structured error handling.

## What It Does

A REST API that looks up Brazilian postal codes (CEP) using external services. It exposes two versions of the same endpoint to compare sequential vs parallel execution strategies:

| Endpoint | Strategy | Description |
|---|---|---|
| `GET /cep/v1/:cep` | Sequential | Fetches address from ViaCEP, then uses the city name to query Nationalize |
| `GET /cep/v2/:cep` | Parallel | Fetches both APIs concurrently via `Promise.all` |

The `:cep` parameter must be exactly 8 numeric digits (e.g., `01001000`). Invalid formats return `400 Bad Request`.

## Tech Stack

- **NestJS 11** — Framework
- **TypeScript** (ES2023) — Language
- **Axios** (`@nestjs/axios`) — HTTP client for external API calls
- **ConfigModule** (`@nestjs/config`) — Environment-based configuration
- **Jest 30** + **Supertest** — Unit and E2E testing

## Getting Started

```bash
npm install
npm run start:dev
# Server runs on http://localhost:3000
```

### Example Request

```bash
curl http://localhost:3000/cep/v2/01001000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run start:dev` | Development server with file watching |
| `npm run start:debug` | Debug mode with file watching |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run compiled output |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage report |
| `npm run lint` | Lint and auto-fix with ESLint |
| `npm run format` | Format code with Prettier |

## Environment Configuration

The app loads `.env.${NODE_ENV}` files (defaults to `.env.development`):

| Variable | Description |
|---|---|
| `PORT` | Server port (default: `3000`) |
| `VIACEP_URL` | ViaCEP API base URL |
| `NATIONALIZE_URL` | Nationalize API base URL |
| `LOG_LEVEL` | Logging level (`debug` in dev, `warn` in prod) |

## External APIs

- [ViaCEP](https://viacep.com.br/) — Brazilian postal code lookup
- [Nationalize.io](https://nationalize.io/) — Nationality prediction by name

## Concepts Explored

- NestJS feature-module architecture
- Custom validation pipes with `PipeTransform`
- Sequential vs parallel external API calls (`Promise.all`)
- Environment-aware configuration with `ConfigModule`
- Error handling with `HttpException` and proper HTTP status codes
- Dependency injection and the NestJS IoC container
- Logging with the built-in NestJS `Logger`
