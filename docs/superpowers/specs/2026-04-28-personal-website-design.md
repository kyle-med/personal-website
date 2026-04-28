# Personal Website Design Spec

**Date**: 2026-04-28
**Status**: Approved

## Overview

Personal academic website deployed on Vercel, built with Astro. Two content modules: academic journal notes and personal achievements. Content managed via Markdown files, updated through Git push → Vercel auto-deploy.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro |
| Styling | Tailwind CSS |
| Content | Markdown + Astro Content Collections |
| Search | Pagefind (build-time static index) |
| Deployment | Vercel (Git-triggered) |
| Fonts | Noto Serif SC (headings), Noto Sans SC (body), JetBrains Mono (metadata) |

## Color Scheme

Muted sage green accent on neutral background.

| Token | Light | Dark |
|---|---|---|
| Background | #f8fafc | #0f172a |
| Surface (cards) | #ffffff | #1e293b |
| Text primary | #0f172a | #f1f5f9 |
| Text secondary | #475569 | #94a3b8 |
| Accent | #2d6a4f | #40916c |
| Accent hover | #1b4332 | #52b788 |
| Border | #e2e8f0 | #334155 |

## Project Structure

```
src/
├── content/
│   ├── config.ts           # Content Collections schema
│   ├── notes/              # Academic journal notes (Markdown)
│   └── achievements/       # Personal achievements (Markdown)
├── pages/
│   ├── index.astro         # Home page
│   ├── notes/
│   │   ├── index.astro     # Notes list + tag filter + search
│   │   └── [slug].astro    # Note detail
│   ├── achievements/
│   │   ├── index.astro     # Achievements list + type filter
│   │   └── [slug].astro    # Achievement detail
│   └── about.astro         # About page
├── components/
│   ├── Layout.astro        # Global layout (nav + footer + SEO)
│   ├── NoteCard.astro      # Note summary card
│   ├── AchievementCard.astro
│   ├── TagFilter.astro     # Tag cloud/filter buttons
│   └── SearchBox.astro     # Pagefind search
└── styles/
    └── global.css          # Tailwind + custom CSS
```

## Routes

| Route | Page | Content |
|---|---|---|
| `/` | Home | Name, bio, entry cards for both modules, 3 latest notes |
| `/notes/` | Notes list | Reverse-chronological list, tag filter, search box |
| `/notes/[slug]` | Note detail | Title, metadata (journal/authors/date/tags/rating), body |
| `/achievements/` | Achievements list | Reverse-chronological list, type filter |
| `/achievements/[slug]` | Achievement detail | Title, date, type badge, body |
| `/about/` | About | Bio, research areas, contact, links |

## Content Schema

### Notes (`src/content/notes/`)

```yaml
---
title: string        # Required
date: Date           # Required
tags: string[]       # Required, e.g. ["深度学习", "NLP"]
journal: string      # Required
authors: string      # Required
year: number         # Required
abstract: string     # Required (one-sentence summary)
rating: number       # Optional (1-5)
draft: boolean       # Default false
---
```

### Achievements (`src/content/achievements/`)

```yaml
---
title: string        # Required
date: Date           # Required
type: string         # Required: "paper" | "project" | "talk" | "award" | "milestone"
draft: boolean       # Default false
---
```

Draft entries (`draft: true`) are excluded from production builds.

## Components

- **Layout.astro** — Global shell: nav bar, footer, SEO meta tags, dark mode support
- **NoteCard.astro** — Displays title, date, journal, tags, rating for a note
- **AchievementCard.astro** — Displays title, date, type badge for an achievement
- **TagFilter.astro** — Cloud of clickable tag buttons, filters NoteCard list
- **SearchBox.astro** — Pagefind-powered search input, only on notes list page

## Update Workflow

1. Create/edit Markdown file in `src/content/{notes,achievements}/`
2. `npm run dev` for local preview
3. `git commit` + `git push` to GitHub main branch
4. Vercel detects push, runs `npm run build`, deploys to production (~30-60s)

### npm scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview"
  }
}
```

## Deployment

| Config | Value |
|---|---|
| Platform | Vercel |
| Framework | Astro (auto-detected) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Domain | Default `*.vercel.app`, custom domain optional |

## Search

Pagefind generates a static search index at build time. The index is loaded on-demand when the user interacts with the search box on the notes list page. No JavaScript is shipped to pages that don't need search.

## Future Considerations (out of scope for initial build)

- Comment system (Giscus)
- Analytics (Umami)
- RSS feed for notes
- Custom domain setup
