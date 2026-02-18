# B2B Sales Assistant (Next.js + Prisma + SQLite)

WhatsApp-free MVP for Turkish B2B sales qualification and operator CRM.

## Features
- Luxury minimalist landing page (`/`)
- Real-time chat flow (`/chat`) with editable lead details and notes panel
- API-powered assistant (`/api/chat`) with strict JSON contract + retry on invalid JSON
- CRM dashboard (`/dashboard`) with password gate + lead list filters
- Lead detail screen (`/dashboard/leads/[id]`) with full timeline, status controls, summary copy
- SQLite persistence with Prisma (`Lead`, `Message`)
- Product catalog seed file (`src/data/products.json`)

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind
- Next Route Handlers for `/api/*`
- Prisma + SQLite
- zod validation
- shadcn/ui setup (`components.json` + ui components)
- OpenAI integration via env vars

## Local Setup
1. `npm install`
2. `cp .env.example .env`
3. `npx prisma migrate dev`
4. `npm run dev`

App runs at: `http://localhost:3000`

## Env Vars
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `MODEL_NAME`
- `SYSTEM_PROMPT`
- `MAX_OUTPUT_TOKENS`
- `DASHBOARD_PASSWORD`

## Optional seed
- `npm run seed`

## API
### `GET /api/health`
```json
{ "ok": true }
```

### `POST /api/chat`
Input:
```json
{
  "lead_id": "optional",
  "message": "string",
  "lead": {
    "company_name": "...",
    "person_name": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "product_interest": "..."
  }
}
```

Output:
```json
{
  "lead_id": "...",
  "reply": "...",
  "intent": "qualify_lead|request_info|offer|handoff|smalltalk|optout",
  "fields_collected": {},
  "fields_missing": [],
  "notes_for_human": "..."
}
```
