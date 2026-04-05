# Server — Backend (Planned)

This directory is a scaffold for the future Node.js backend.  
The frontend in `../client/` is fully functional with mock data today.

## Planned stack

| Concern | Technology |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | Express or Fastify |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT + refresh tokens |
| Real-time | Socket.IO or native WebSocket |

## Directory layout

```
server/src/
├── config/       # Database, environment, and app configuration
├── controllers/  # Route handler functions (thin, delegate to services)
├── middlewares/  # Auth guard, error handler, rate limiter, request logger
├── models/       # Prisma schema or ORM model definitions
├── routes/       # Express router definitions (map HTTP routes to controllers)
└── utils/        # Server-side utility functions
```

## Frontend integration contract

The frontend service layer (`client/src/services/`) defines the API contracts.  
Each function includes a `TODO: API` comment with the expected HTTP method and endpoint.  
Implement those endpoints here and update `VITE_USE_MOCK_DATA=false` in the client
`.env.local` to switch from mock data to the real API.
