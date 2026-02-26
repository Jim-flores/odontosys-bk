# AGENTS.md

## Dev commands
- Install: `npm install`
- Start dev server: `npm run start:dev`
- Debug watch mode: `npm run start:debug`
- Build: `npm run build`
- Run production build: `npm run start:prod`
- Lint (auto-fix): `npm run lint`
- Format: `npm run format`
- Unit tests: `npm run test`
- Coverage: `npm run test:cov`
- Prisma generate client: `npm run prisma:generate`
- Prisma dev migration: `npm run prisma:migrate:dev`
- Prisma deploy migrations: `npm run prisma:migrate:deploy`
- Prisma schema push: `npm run prisma:push`
- Prisma Studio: `npm run prisma:studio`
- Seed DB: `npm run prisma:seed`

## Folder architecture
- `src/main.ts`: app bootstrap, global `ValidationPipe`, CORS, Swagger (`/api/docs`), global exception filter.
- `src/app.module.ts`: root module, global guards (`JwtAuthGuard`, `RolesGuard`), module wiring.
- `src/common/`: shared cross-cutting code.
- `src/common/decorators/`: `@Public`, `@Permissions`, `@CurrentUser`.
- `src/common/guards/`: auth and permission guards.
- `src/common/filters/`: HTTP + Prisma error normalization.
- `src/common/interceptors/`: standard response wrapper (use when enabled).
- `src/modules/<domain>/`: domain modules (`auth`, `users`, `companies`, `branches`, `roles`, `permissions`, `clients`) with controller/service/dto split.
- `src/prisma/`: Nest Prisma module/service.
- `prisma/schema.prisma`: data model and enums.
- `prisma/migrations/`: SQL migrations.
- `prisma/seed.ts`: seed data.

## Coding rules
- Keep Nest layering: controller -> service -> Prisma; do not query Prisma directly from controllers.
- Add DTOs for all input/query payloads and validate with `class-validator`.
- Annotate endpoints with Swagger decorators (`@ApiTags`, `@ApiOperation`, `@ApiBearerAuth` where applicable).
- Default routes are protected by global JWT guard; use `@Public()` only for explicit public endpoints.
- Use `@Permissions(...)` for RBAC on protected handlers.
- Keep error responses consistent via `HttpExceptionFilter`; prefer throwing Nest HTTP exceptions in services.
- Follow existing import style in touched files (repo currently mixes relative imports and `@/*` alias).
- Preserve API response shapes already used by each module (avoid silent contract changes).
