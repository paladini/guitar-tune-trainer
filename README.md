# Guitar Tune Trainer

Web-based guitar tuner optimized for smartwatch and mobile, with a Node/Express backend and PostgreSQL database.

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL (local, Docker, or Neon)

## Quick Start

### 1. Clone the repository

```bash
git clone <repo-url>
cd guitar-tune-trainer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database (with Docker)

You can use the provided `docker-compose.yml` to start a local PostgreSQL instance:

```bash
docker-compose up -d
```

This will start a PostgreSQL server on port 5432 with:
- user: `postgres`
- password: `postgres`
- database: `guitar_tune_trainer`

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/guitar_tune_trainer
SESSION_SECRET=your-session-secret
PORT=5000
```

- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: a random string for session security
- `PORT`: server port (optional, defaults to 5000)

### 5. Run database migrations

```bash
npm run db:push
```

## Development

To start the app in development mode (with hot reload):

```bash
npm run dev
```

Visit: http://localhost:5000

## Production build

To build the app:

```bash
npm run build
```

To start in production mode:

```bash
npm start
```

---

**Tech stack:**
- Frontend: React 18 + Vite + Tailwind + shadcn/ui
- Backend: Express + Drizzle ORM + PostgreSQL
- PWA: Installable and offline support

