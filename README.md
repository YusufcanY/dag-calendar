# DAG 2026 Eğitim Takvimi

An interactive education calendar for **Doğa Aktiviteleri Grubu (DAG)** — a mountaineering and outdoor activities group. It displays the full 2026 training program with seminars, field activities, and practice sessions, along with their prerequisites.

Official Website: [dag.org.tr](https://www.dag.org.tr)

## Features

- Monthly calendar view with navigation
- Filter events by education year (Year I / Year II / All)
- Search events by name or code
- Event detail modal showing description, dates, and prerequisite chain
- TBD events section for activities without confirmed dates
- Umami analytics (proxied through Next.js rewrites)

## Tech Stack

- **Next.js 16** (App Router, standalone output)
- **React 19**
- **Tailwind CSS v4**
- **Three.js** — topographic background animation
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

```bash
docker build -t dag-calendar .
docker run -p 5050:5050 dag-calendar
```

The container listens on port **5050**.

## Project Structure

```
app/          # Next.js App Router pages and layout
components/   # UI components (Calendar, EventModal, Filters, etc.)
data/         # Event data and code→name mappings
lib/          # Utilities (calendar logic, analytics, event colors)
types/        # TypeScript type definitions
public/       # Static assets
```
