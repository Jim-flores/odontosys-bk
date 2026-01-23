# NestJS Prisma Boilerplate

A production-ready NestJS API boilerplate with Prisma ORM, JWT authentication, role-based access control (RBAC), and global error handling. Perfect for building multi-tenant SaaS applications.

## Features

- ✅ Authentication with JWT
- ✅ Role-based access control (RBAC)
- ✅ Permission system with decorators
- ✅ Global exception filter with Prisma error handling
- ✅ Response interceptor for consistent API format
- ✅ Swagger/OpenAPI documentation
- ✅ PostgreSQL with Prisma ORM
- ✅ Multi-tenant architecture (Company → Branch → Users)
- ✅ Type-safe error utilities
- ✅ Environment configuration

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Authentication**: JWT with Passport

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate:dev
   ```

5. Seed the database (optional):
   ```bash
   npm run prisma:seed
   ```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

Once the server is running, visit:
- API: http://localhost:3000/api
- Swagger Docs: http://localhost:3000/api/docs

## Default Credentials (after seeding)

- Email: admin@gmail.com
- Password: admin123

## Project Structure

```
src/
├── common/
│   ├── decorators/        # Custom decorators (@Public, @Permissions)
│   ├── filters/          # Global exception filter
│   ├── guards/           # Auth guards (JWT, Roles)
│   ├── interceptors/     # Response interceptor
│   └── utils/           # Error utilities
├── modules/
│   ├── auth/             # JWT authentication
│   ├── users/            # User management
│   ├── companies/        # Company management
│   ├── branches/         # Branch management
│   ├── roles/            # Role management
│   ├── permissions/      # Permission management
│   └── clients/          # Client management
├── prisma/              # Prisma service
├── app.module.ts
└── main.ts
```

## Database Schema

The application includes the following entities:
- Company (multi-tenant)
- Branch (belongs to company)
- User (belongs to branch, has roles)
- Role (company-specific)
- Permission (global)
- Client (belongs to branch, optionally assigned to user)

## Error Handling

The boilerplate includes:
- **Global exception filter**: Catches all exceptions and returns consistent error responses
- **Prisma error mapping**: Translates Prisma error codes to HTTP status codes
- **Response interceptor**: Wraps all responses in a consistent format

## Available Scripts

```bash
npm run build              # Build the application
npm run start:dev          # Start in development mode with watch
npm run start:debug        # Start in debug mode
npm run start:prod         # Start in production mode
npm run lint               # Run ESLint
npm run test               # Run unit tests
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate:dev # Run development migrations
npm run prisma:migrate:deploy # Run production migrations
npm run prisma:push        # Push schema changes without migration
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed the database
```

## Customization

This boilerplate is designed to be easily customizable:
- Modify `prisma/schema.prisma` to change your data models
- Add new modules in `src/modules/`
- Extend permissions in the seed file
- Customize error messages in the exception filter

## License

ISC
