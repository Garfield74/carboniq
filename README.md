# CarbonIQ 🌿

**Carbon Accounting & CBAM Compliance SaaS for EU Businesses**

The all-in-one platform for CBAM declarations, GHG Scope 1-2-3 reporting, and IFRS S1/S2 disclosures — built for Romanian and EU SMEs.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes + Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (EUR subscriptions)
- **Email**: Resend
- **AI**: Anthropic Claude API (report drafting)
- **Deployment**: Vercel

## Features

- 🧮 **Free CBAM cost calculator** (public, no login)
- 📊 **GHG Scope 1, 2 & 3** calculation with DEFRA/EPA/EEA emission factors
- 📋 **CBAM declarations** — EU Registry-compatible XML export
- 🏭 **Supplier portal** — automated questionnaires for actual emission data
- 🛡️ **IFRS S2** — 4-pillar climate disclosure wizard
- 💰 Plans from **€79/month** — 90% cheaper than consultants

## Getting Started

```bash
# 1. Clone and install
git clone https://github.com/Garfield74/carboniq.git
cd carboniq
npm install

# 2. Set environment variables
cp .env.example .env.local
# Fill in Supabase, Stripe, Resend, Anthropic keys

# 3. Apply database schema
# Copy supabase/migrations/001_initial_schema.sql → Supabase SQL Editor → Run

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

## Environment Variables

See `.env.example` for all required variables. Required for Phase 1:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase)
- `STRIPE_SECRET_KEY` + `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Stripe)
- `RESEND_API_KEY` (Resend)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/         # Public marketing site
│   │   ├── page.tsx         # Homepage
│   │   ├── pricing/         # Pricing page
│   │   ├── cbam-calculator/ # Free CBAM calculator
│   │   └── auth/            # Login + signup
│   └── app/                 # Authenticated app
│       ├── dashboard/       # Main dashboard
│       ├── ghg/             # Scope 1, 2, 3
│       ├── cbam/            # CBAM declarations + suppliers
│       ├── ifrs/            # IFRS S1 + S2
│       ├── reports/         # Report downloads
│       └── settings/        # Company, users, billing
├── components/
│   ├── ui/                  # Button, Card, Input, Badge, etc.
│   ├── marketing/           # Navbar, footer
│   └── app/                 # Sidebar
├── lib/
│   ├── constants.ts         # Emission factors, CBAM data, plans
│   ├── utils.ts             # Helpers
│   ├── stripe.ts            # Stripe client
│   └── supabase/            # Client + server Supabase helpers
└── types/
    └── database.ts          # Type-safe Supabase schema types

supabase/
└── migrations/
    └── 001_initial_schema.sql  # Full DB schema with RLS
```

## Subscription Plans

| Plan | Price | Users | Key Features |
|------|-------|-------|--------------|
| Starter | €79/mo | 1 | GHG Scope 1+2, 5 CBAM goods |
| Growth | €199/mo | 5 | Full CBAM, Scope 3 (10 cats), IFRS S2 |
| Professional | €449/mo | 15 | All 15 Scope 3, full IFRS S1+S2, API |
| Enterprise | Custom | ∞ | ERP integrations, EU ETS dashboard |

## Data Sources

Emission factors from trusted open databases — **zero API cost in Phase 1**:
- UK DEFRA GHG Conversion Factors 2024
- US EPA GHG Emission Factors Hub
- EU EEA Emission Factor Database
- IPCC Emissions Factor Database (EFDB)
- IEA CO₂ Emissions from Fuel Combustion

Phase 2 additions: Climatiq API, Electricity Maps API (real-time Scope 2), EU ETS price feed.

---

Built with [Claude Code](https://claude.com/claude-code) · Romania / EU 🇷🇴🇪🇺
