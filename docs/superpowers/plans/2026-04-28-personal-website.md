# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal academic website with Astro, featuring academic journal notes and personal achievements modules, deployable on Vercel via git push.

**Architecture:** Astro static site with two Content Collections (notes, achievements). Markdown files with frontmatter as the content source. Tailwind CSS for styling with a muted sage green palette and dark mode. Pagefind for build-time search index on the notes list page.

**Tech Stack:** Astro, Tailwind CSS, Astro Content Collections (Zod schemas), Pagefind, Google Fonts (Noto Serif SC, Noto Sans SC, JetBrains Mono)

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `astro.config.mjs`, `tailwind.config.mjs`, `package.json`, `tsconfig.json`
- Remove: `index.html` (old Claude Code page at project root)

- [ ] **Step 1: Create Astro project**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npm create astro@latest . -- --template minimal --typescript strict --skip-houston --install
```

Expected: Creates `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/` directory. May prompt to overwrite existing files — accept.

- [ ] **Step 2: Install dependencies**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npm install @astrojs/tailwind tailwindcss @tailwindcss/typography pagefind
```

Expected: All packages installed. Verify: `npx astro --version` prints version info.

- [ ] **Step 3: Configure astro.config.mjs**

Write `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://your-site.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
```

- [ ] **Step 4: Configure tailwind.config.mjs**

Write `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#2d6a4f',
          hover: '#1b4332',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        bg: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#475569',
            '--tw-prose-headings': '#0f172a',
            '--tw-prose-links': '#2d6a4f',
            '--tw-prose-bold': '#0f172a',
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

- [ ] **Step 5: Remove old index.html**

Run:
```bash
rm /c/Users/ckq17/Desktop/plahground/index.html
```

- [ ] **Step 6: Verify scaffolding**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds with "0 pages" (no pages yet, just the empty src/pages/index.astro from the template). If the template created a `src/pages/index.astro`, leave it for now — it will be replaced in Task 5.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro project with Tailwind and Pagefind"
```

---

### Task 2: Content Collections Schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/notes/.gitkeep` (placeholder until first note)
- Create: `src/content/achievements/.gitkeep`

- [ ] **Step 1: Write Content Collections config**

Write `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    journal: z.string(),
    authors: z.string(),
    year: z.number(),
    abstract: z.string(),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().default(false),
  }),
});

const achievementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['paper', 'project', 'talk', 'award', 'milestone']),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  notes: notesCollection,
  achievements: achievementsCollection,
};
```

- [ ] **Step 2: Create placeholder files for empty collections**

Run:
```bash
touch /c/Users/ckq17/Desktop/plahground/src/content/notes/.gitkeep
touch /c/Users/ckq17/Desktop/plahground/src/content/achievements/.gitkeep
```

- [ ] **Step 3: Verify TypeScript compilation**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro sync
```

Expected: Generates `.astro/types.d.ts` without errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts && git commit -m "feat: add Content Collections schemas for notes and achievements"
```

---

### Task 3: Global Styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write global CSS with Tailwind directives and custom properties**

Write `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

@layer base {
  :root {
    --color-bg: #f8fafc;
    --color-surface: #ffffff;
    --color-text: #0f172a;
    --color-text-secondary: #475569;
    --color-accent: #2d6a4f;
    --color-accent-hover: #1b4332;
    --color-border: #e2e8f0;
  }

  .dark {
    --color-bg: #0f172a;
    --color-surface: #1e293b;
    --color-text: #f1f5f9;
    --color-text-secondary: #94a3b8;
    --color-accent: #40916c;
    --color-accent-hover: #52b788;
    --color-border: #334155;
  }

  html {
    font-family: 'Noto Sans SC', system-ui, sans-serif;
    color: var(--color-text);
    background-color: var(--color-bg);
  }

  body {
    @apply antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Serif SC', Georgia, serif;
    color: var(--color-text);
  }

  code, pre {
    font-family: 'JetBrains Mono', Consolas, monospace;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-accent-hover);
  }
}

@layer components {
  .prose-custom {
    @apply max-w-none;
  }

  .prose-custom h1,
  .prose-custom h2,
  .prose-custom h3 {
    font-family: 'Noto Serif SC', Georgia, serif;
  }

  .prose-custom a {
    color: var(--color-accent);
  }

  .prose-custom a:hover {
    color: var(--color-accent-hover);
  }
}
```

- [ ] **Step 2: Verify CSS loads**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build 2>&1 | tail -5
```

Expected: Build succeeds (pages are empty but CSS processing works).

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css && git commit -m "feat: add global styles with Tailwind, fonts, and dark mode CSS vars"
```

---

### Task 4: Layout Component

**Files:**
- Create: `src/components/Layout.astro`

- [ ] **Step 1: Write Layout component**

Write `src/components/Layout.astro`:

```astro
---
import '../styles/global.css';

export interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Personal academic website' } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen flex flex-col bg-[var(--color-bg)]">
    <nav class="border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" class="text-lg font-serif font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
          Hoikei Chan
        </a>
        <div class="flex gap-6 text-sm font-medium">
          <a href="/notes" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Notes</a>
          <a href="/achievements" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Achievements</a>
          <a href="/about" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">About</a>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-text-secondary)]">
      <div class="max-w-4xl mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Hoikei Chan. Built with Astro.</p>
      </div>
    </footer>

    <script is:inline>
      // Dark mode toggle based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      function updateTheme() {
        document.documentElement.classList.toggle('dark', prefersDark.matches);
      }
      updateTheme();
      prefersDark.addEventListener('change', updateTheme);
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verify component parses**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Layout.astro && git commit -m "feat: add Layout component with nav, footer, and dark mode"
```

---

### Task 5: Home Page

**Files:**
- Write: `src/pages/index.astro` (overwrite template)

- [ ] **Step 1: Write home page**

Write `src/pages/index.astro`:

```astro
---
import Layout from '../components/Layout.astro';
import { getCollection } from 'astro:content';

const latestNotes = (await getCollection('notes', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);
---

<Layout title="Hoikei Chan" description="Personal academic website — journal notes and achievements">
  <section class="max-w-4xl mx-auto px-6 py-24 md:py-36">
    <h1 class="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)] mb-4">
      Hoikei Chan
    </h1>
    <p class="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-12">
      Exploring interesting ideas at the intersection of research and practice.
      Sharing academic journal notes and tracking my progress.
    </p>

    <div class="grid sm:grid-cols-2 gap-4 mb-20">
      <a href="/notes" class="block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div class="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">Academic Notes</div>
        <h2 class="font-serif text-xl font-bold text-[var(--color-text)] mb-1">Journal Notes</h2>
        <p class="text-sm text-[var(--color-text-secondary)]">Notes and commentary on papers I read</p>
      </a>
      <a href="/achievements" class="block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div class="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">Achievements</div>
        <h2 class="font-serif text-xl font-bold text-[var(--color-text)] mb-1">Progress Log</h2>
        <p class="text-sm text-[var(--color-text-secondary)]">Papers, projects, talks, and milestones</p>
      </a>
    </div>

    {
      latestNotes.length > 0 && (
        <div>
          <h2 class="font-serif text-2xl font-bold text-[var(--color-text)] mb-6">Recent Notes</h2>
          <div class="grid gap-4">
            {latestNotes.map((note) => (
              <a href={`/notes/${note.slug}`} class="block p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-sm transition-all">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="font-serif font-bold text-[var(--color-text)] mb-1">{note.data.title}</h3>
                    <p class="text-sm text-[var(--color-text-secondary)]">{note.data.journal} ({note.data.year}) &middot; {note.data.authors}</p>
                  </div>
                  {note.data.rating && (
                    <span class="text-sm font-medium text-[var(--color-accent)] whitespace-nowrap">{'★'.repeat(note.data.rating)}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
          <div class="mt-6">
            <a href="/notes" class="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
              View all notes &rarr;
            </a>
          </div>
        </div>
      )
    }
  </section>
</Layout>
```

- [ ] **Step 2: Verify page builds (empty collections — no notes section)**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. The "Recent Notes" section won't render (empty collection), which is correct.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro && git commit -m "feat: add home page with module entry cards and latest notes"
```

---

### Task 6: Sample Content

**Files:**
- Create: `src/content/notes/hello-world.md`
- Create: `src/content/achievements/hello-world.md`
- Remove: `src/content/notes/.gitkeep`, `src/content/achievements/.gitkeep`

- [ ] **Step 1: Create sample note**

Write `src/content/notes/hello-world.md`:

```md
---
title: "Deep Residual Learning for Image Recognition"
date: 2026-04-20
tags: ["深度学习", "计算机视觉", "CNN"]
journal: "CVPR 2016"
authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun"
year: 2016
abstract: "提出残差学习框架，通过恒等映射解决深层网络退化问题，使152层网络在ImageNet上达到3.57%错误率。"
rating: 5
draft: false
---

## 核心问题

深层网络面临梯度消失/爆炸问题，但更重要的是**退化问题（degradation problem）**：随着网络深度增加，准确率趋于饱和后迅速下降，这不是过拟合导致的。

## 关键思路

不再让每层直接学习目标映射 H(x)，而是学习残差 F(x) = H(x) - x。这样：
1. 如果恒等映射是最优的，网络只需要把残差推至零（比拟合恒等映射容易）
2. 短路连接（shortcut connections）让梯度可以直接流过，不衰减

## 实现细节

- **残差块**：两层 3×3 卷积 + BatchNorm + ReLU，输出加上输入 x 再过 ReLU
- **瓶颈块（Bottleneck）**：1×1 降维 → 3×3 → 1×1 升维，减少计算量
- 下采样时 shortcut 用 1×1 卷积匹配维度

## 我的思考

ResNet 的优雅之处在于把问题从"学什么"转化为"学什么增量"。这个范式影响了后续几乎所有架构——DenseNet 把残差做到极致，Transformer 的残差连接也是同一思路。另外，BatchNorm 在残差块里的作用和 LayerNorm 在 Transformer 里的作用有异曲同工之妙，都保证了梯度的稳定流动。
```

- [ ] **Step 2: Create sample achievement**

Write `src/content/achievements/hello-world.md`:

```md
---
title: "ResNet 论文精读笔记完成"
date: 2026-04-20
type: "milestone"
draft: false
---

完成了 ResNet 论文的精读笔记，这是建立个人学术笔记系统的第一篇。采用了"问题 → 思路 → 细节 → 思考"的四段结构，既包含论文核心内容，也记录了自己的理解和联想。

后续计划：
- 每周至少精读一篇经典论文
- 覆盖领域：深度学习、认知科学、计算语言学
- 每篇笔记关联相关论文，逐步建立知识图谱
```

- [ ] **Step 3: Remove .gitkeep placeholders**

Run:
```bash
rm /c/Users/ckq17/Desktop/plahground/src/content/notes/.gitkeep
rm /c/Users/ckq17/Desktop/plahground/src/content/achievements/.gitkeep
```

- [ ] **Step 4: Verify build with sample content**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. Home page now shows "Recent Notes" with the ResNet note.

- [ ] **Step 5: Commit**

```bash
git add src/content/ && git commit -m "feat: add sample content for notes and achievements"
```

---

### Task 7: NoteCard, TagFilter, and Notes List Page

**Files:**
- Create: `src/components/NoteCard.astro`
- Create: `src/components/TagFilter.astro`
- Create: `src/pages/notes/index.astro`

- [ ] **Step 1: Write NoteCard component**

Write `src/components/NoteCard.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';

const { note } = Astro.props as { note: CollectionEntry<'notes'> };
---

<a
  href={`/notes/${note.slug}`}
  class="block p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
>
  <div class="flex items-start justify-between gap-4 mb-2">
    <h3 class="font-serif font-bold text-[var(--color-text)]">{note.data.title}</h3>
    {note.data.rating && (
      <span class="text-sm text-[var(--color-accent)] whitespace-nowrap">{'★'.repeat(note.data.rating)}{'☆'.repeat(5 - note.data.rating)}</span>
    )}
  </div>
  <p class="text-sm text-[var(--color-text-secondary)] mb-3">
    {note.data.journal} ({note.data.year}) &middot; {note.data.authors}
  </p>
  <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">{note.data.abstract}</p>
  <div class="flex flex-wrap gap-2 mt-3">
    {note.data.tags.map((tag) => (
      <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
        {tag}
      </span>
    ))}
  </div>
</a>
```

- [ ] **Step 2: Write TagFilter component**

Write `src/components/TagFilter.astro`:

```astro
---
const { tags, activeTag } = Astro.props as { tags: string[]; activeTag: string | null };
---

<div class="flex flex-wrap gap-2 mb-6">
  <a
    href="/notes"
    class={`text-sm px-3 py-1 rounded-full border transition-colors ${
      activeTag === null
        ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
        : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
    }`}
  >
    All
  </a>
  {tags.map((tag) => (
    <a
      href={`/notes?tag=${encodeURIComponent(tag)}`}
      class={`text-sm px-3 py-1 rounded-full border transition-colors ${
        activeTag === tag
          ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
          : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      }`}
    >
      {tag}
    </a>
  ))}
</div>
```

- [ ] **Step 3: Write Notes list page**

Write `src/pages/notes/index.astro`:

```astro
---
import Layout from '../../components/Layout.astro';
import NoteCard from '../../components/NoteCard.astro';
import TagFilter from '../../components/TagFilter.astro';
import SearchBox from '../../components/SearchBox.astro';
import { getCollection } from 'astro:content';

const allNotes = (await getCollection('notes', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const allTags = [...new Set(allNotes.flatMap((n) => n.data.tags))].sort();

const activeTag = Astro.url.searchParams.get('tag');
const filteredNotes = activeTag
  ? allNotes.filter((n) => n.data.tags.includes(activeTag))
  : allNotes;
---

<Layout title="Academic Notes — Hoikei Chan" description="Notes on academic papers and journals">
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="font-serif text-3xl font-extrabold text-[var(--color-text)] mb-2">Academic Notes</h1>
    <p class="text-[var(--color-text-secondary)] mb-8">Notes and commentary on papers I read</p>

    <SearchBox />
    <TagFilter tags={allTags} activeTag={activeTag} />

    {
      filteredNotes.length === 0 ? (
        <p class="text-[var(--color-text-secondary)] py-12 text-center">No notes found.</p>
      ) : (
        <div class="grid gap-4">
          {filteredNotes.map((note) => <NoteCard note={note} />)}
        </div>
      )
    }
  </section>
</Layout>
```

- [ ] **Step 4: Create SearchBox stub and verify build**

Write `src/components/SearchBox.astro`:

```astro
---
// Pagefind search box — full implementation in Task 12
---
<div id="search" class="mb-6"></div>
```

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/NoteCard.astro src/components/TagFilter.astro src/components/SearchBox.astro src/pages/notes/ && git commit -m "feat: add notes list page with NoteCard, TagFilter, and SearchBox stub"
```

---

### Task 8: Note Detail Page

**Files:**
- Create: `src/pages/notes/[slug].astro`

- [ ] **Step 1: Write note detail page**

Write `src/pages/notes/[slug].astro`:

```astro
---
import Layout from '../../components/Layout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.map((note) => ({ params: { slug: note.slug }, props: { note } }));
}

const { note } = Astro.props;
const { title, date, tags, journal, authors, year, abstract, rating } = note.data;
---

<Layout title={`${title} — Hoikei Chan`} description={abstract}>
  <article class="max-w-3xl mx-auto px-6 py-16">
    <a href="/notes" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-6 inline-block">&larr; Back to Notes</a>

    <header class="mb-10">
      <h1 class="font-serif text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mb-4">{title}</h1>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)] mb-4">
        <span class="font-medium text-[var(--color-accent)]">{journal}</span>
        <span>{year}</span>
        <span>{authors}</span>
        <time datetime={date.toISOString()}>
          {date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        {rating && <span class="text-[var(--color-accent)]">{'★'.repeat(rating)}</span>}
      </div>
      <div class="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a href={`/notes?tag=${encodeURIComponent(tag)}`} class="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
            {tag}
          </a>
        ))}
      </div>
    </header>

    <div class="prose-custom prose prose-slate max-w-none">
      {note.body}
    </div>
  </article>
</Layout>
```

- [ ] **Step 2: Verify build and note page generation**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. Check that `dist/notes/hello-world/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/notes/ && git commit -m "feat: add note detail page with metadata and prose body"
```

---

### Task 9: AchievementCard and Achievements List Page

**Files:**
- Create: `src/components/AchievementCard.astro`
- Create: `src/pages/achievements/index.astro`

- [ ] **Step 1: Write AchievementCard component**

Write `src/components/AchievementCard.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';

const { achievement } = Astro.props as { achievement: CollectionEntry<'achievements'> };

const typeLabel: Record<string, string> = {
  paper: 'Paper',
  project: 'Project',
  talk: 'Talk',
  award: 'Award',
  milestone: 'Milestone',
};

const typeColor: Record<string, string> = {
  paper: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  project: 'bg-blue-50 text-blue-700 border-blue-200',
  talk: 'bg-purple-50 text-purple-700 border-purple-200',
  award: 'bg-amber-50 text-amber-700 border-amber-200',
  milestone: 'bg-slate-100 text-slate-600 border-slate-200',
};
---

<a
  href={`/achievements/${achievement.slug}`}
  class="block p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-sm hover:-translate-y-0.5 transition-all"
>
  <div class="flex items-start justify-between gap-4">
    <div>
      <h3 class="font-serif font-bold text-[var(--color-text)] mb-1">{achievement.data.title}</h3>
      <time class="text-sm text-[var(--color-text-secondary)]" datetime={achievement.data.date.toISOString()}>
        {achievement.data.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
    </div>
    <span class={`text-xs px-2 py-0.5 rounded-full border ${typeColor[achievement.data.type] || typeColor.milestone}`}>
      {typeLabel[achievement.data.type] || achievement.data.type}
    </span>
  </div>
</a>
```

- [ ] **Step 2: Write Achievements list page**

Write `src/pages/achievements/index.astro`:

```astro
---
import Layout from '../../components/Layout.astro';
import AchievementCard from '../../components/AchievementCard.astro';
import { getCollection } from 'astro:content';

const allAchievements = (await getCollection('achievements', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const allTypes = [...new Set(allAchievements.map((a) => a.data.type))];

const activeType = Astro.url.searchParams.get('type');
const filtered = activeType
  ? allAchievements.filter((a) => a.data.type === activeType)
  : allAchievements;

const typeLabel: Record<string, string> = {
  paper: 'Papers',
  project: 'Projects',
  talk: 'Talks',
  award: 'Awards',
  milestone: 'Milestones',
};
---

<Layout title="Achievements — Hoikei Chan" description="Personal achievements and progress log">
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="font-serif text-3xl font-extrabold text-[var(--color-text)] mb-2">Achievements</h1>
    <p class="text-[var(--color-text-secondary)] mb-8">Papers, projects, talks, and milestones</p>

    <div class="flex flex-wrap gap-2 mb-8">
      <a
        href="/achievements"
        class={`text-sm px-3 py-1 rounded-full border transition-colors ${
          activeType === null
            ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
        }`}
      >
        All
      </a>
      {allTypes.map((t) => (
        <a
          href={`/achievements?type=${encodeURIComponent(t)}`}
          class={`text-sm px-3 py-1 rounded-full border transition-colors ${
            activeType === t
              ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
          }`}
        >
          {typeLabel[t] || t}
        </a>
      ))}
    </div>

    {
      filtered.length === 0 ? (
        <p class="text-[var(--color-text-secondary)] py-12 text-center">No achievements yet.</p>
      ) : (
        <div class="grid gap-4">
          {filtered.map((a) => <AchievementCard achievement={a} />)}
        </div>
      )
    }
  </section>
</Layout>
```

- [ ] **Step 3: Verify build**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. `dist/achievements/index.html` and `dist/achievements/hello-world/index.html` exist.

- [ ] **Step 4: Commit**

```bash
git add src/components/AchievementCard.astro src/pages/achievements/ && git commit -m "feat: add achievements list page with AchievementCard and type filter"
```

---

### Task 10: Achievement Detail Page

**Files:**
- Create: `src/pages/achievements/[slug].astro`

- [ ] **Step 1: Write achievement detail page**

Write `src/pages/achievements/[slug].astro`:

```astro
---
import Layout from '../../components/Layout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const achievements = await getCollection('achievements', ({ data }) => !data.draft);
  return achievements.map((a) => ({ params: { slug: a.slug }, props: { achievement: a } }));
}

const { achievement } = Astro.props;
const { title, date, type } = achievement.data;

const typeLabel: Record<string, string> = {
  paper: 'Paper',
  project: 'Project',
  talk: 'Talk',
  award: 'Award',
  milestone: 'Milestone',
};
---

<Layout title={`${title} — Hoikei Chan`}>
  <article class="max-w-3xl mx-auto px-6 py-16">
    <a href="/achievements" class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-6 inline-block">&larr; Back to Achievements</a>

    <header class="mb-10">
      <h1 class="font-serif text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mb-4">{title}</h1>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
        <time datetime={date.toISOString()}>
          {date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <span class="text-xs px-2 py-0.5 rounded-full border bg-[var(--color-bg)] border-[var(--color-border)]">
          {typeLabel[type] || type}
        </span>
      </div>
    </header>

    <div class="prose-custom prose prose-slate max-w-none">
      {achievement.body}
    </div>
  </article>
</Layout>
```

- [ ] **Step 2: Verify build**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. `dist/achievements/hello-world/index.html` now renders full detail.

- [ ] **Step 3: Commit**

```bash
git add src/pages/achievements/ && git commit -m "feat: add achievement detail page"
```

---

### Task 11: About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Write About page**

Write `src/pages/about.astro`:

```astro
---
import Layout from '../components/Layout.astro';
---

<Layout title="About — Hoikei Chan" description="About me, research interests, and contact">
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="font-serif text-3xl font-extrabold text-[var(--color-text)] mb-8">About</h1>

    <div class="prose-custom prose prose-slate max-w-none space-y-6">
      <p class="text-lg text-[var(--color-text-secondary)] leading-relaxed">
        Hi, I'm Hoikei Chan. I'm interested in deep learning, computer vision, and cognitive science.
        This site is where I share notes on papers I read and track my academic progress.
      </p>

      <h2 class="font-serif text-xl font-bold text-[var(--color-text)] mt-10 mb-4">Research Interests</h2>
      <ul class="list-disc pl-5 text-[var(--color-text-secondary)] space-y-2">
        <li>Deep Learning — architectures, training dynamics, representation learning</li>
        <li>Computer Vision — image recognition, object detection, generative models</li>
        <li>Cognitive Science — attention mechanisms, memory systems, neural correlates</li>
      </ul>

      <h2 class="font-serif text-xl font-bold text-[var(--color-text)] mt-10 mb-4">Contact</h2>
      <p class="text-[var(--color-text-secondary)]">
        GitHub: <a href="https://github.com/hoikei" class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">@hoikei</a><br />
        Email: <a href="mailto:hoikei.chan@academic.org" class="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">hoikei.chan@academic.org</a>
      </p>
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Verify build**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Expected: Build succeeds. `dist/about/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro && git commit -m "feat: add about page with bio, interests, and contact"
```

---

### Task 12: Pagefind Search Integration

**Files:**
- Modify: `src/components/SearchBox.astro` (replace stub)
- Modify: `package.json` (verify build script)

- [ ] **Step 1: Write real SearchBox component**

Write `src/components/SearchBox.astro`:

```astro
---
// Pagefind search box
// The pagefind JS/CSS are generated at build time into dist/pagefind/
// We load them from the pagefind output directory
---
<div id="search" class="mb-6"></div>

<script is:inline>
  (async () => {
    try {
      const pagefind = await import('/pagefind/pagefind.js');
      await pagefind.init();
      new pagefind.SearchBox({
        element: '#search',
        placeholder: 'Search notes...',
        baseUrl: '/',
        bundlePath: '/pagefind/',
        showImages: false,
        showSubResults: false,
      });
    } catch (e) {
      // Pagefind not available (dev mode or build without indexing)
      const el = document.querySelector('#search');
      if (el) el.innerHTML =
        '<input type="text" placeholder="Search available after build..." class="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-secondary)]" disabled />';
    }
  })();
</script>

<style is:inline>
  .pagefind-modular-input {
    width: 100%;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    font-size: 0.875rem;
    color: var(--color-text);
    font-family: inherit;
  }
  .pagefind-modular-input:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
  }
  .pagefind-modular-list {
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    overflow: hidden;
  }
  .pagefind-modular-list-link {
    display: block;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border);
    transition: background 0.15s;
  }
  .pagefind-modular-list-link:last-child {
    border-bottom: none;
  }
  .pagefind-modular-list-link:hover {
    background: var(--color-bg);
  }
  .pagefind-modular-list-link mark {
    background: #bbf7d0;
    color: inherit;
    border-radius: 2px;
    padding: 0 2px;
  }
</style>
```

- [ ] **Step 2: Verify build scripts include Pagefind**

Read `package.json` and confirm the build script is:
```json
"build": "astro build && pagefind --site dist"
```

If not, update it.

- [ ] **Step 3: Build and verify Pagefind index is generated**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npm run build
```

Expected:
- Build succeeds
- `dist/pagefind/` directory exists with `pagefind.js`, `pagefind.css`, etc.
- `dist/notes/index.html` contains the search box

- [ ] **Step 4: Commit**

```bash
git add src/components/SearchBox.astro package.json && git commit -m "feat: integrate Pagefind search on notes list page"
```

---

### Task 13: Final Build Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Clean build**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && rm -rf dist && npm run build
```

Expected: Clean build succeeds with no errors.

- [ ] **Step 2: Verify all output files exist**

Run:
```bash
ls /c/Users/ckq17/Desktop/plahground/dist/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/notes/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/notes/hello-world/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/achievements/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/achievements/hello-world/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/about/index.html \
   /c/Users/ckq17/Desktop/plahground/dist/pagefind/pagefind.js
```

Expected: All 7 files exist.

- [ ] **Step 3: Verify draft filtering works**

Create a test draft file `src/content/notes/test-draft.md`:

```md
---
title: "Draft Test"
date: 2026-01-01
tags: ["test"]
journal: "Test"
authors: "Test"
year: 2026
abstract: "This should not appear"
draft: true
---
```

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npx astro build
```

Check that `dist/notes/test-draft/index.html` does NOT exist:
```bash
test -f /c/Users/ckq17/Desktop/plahground/dist/notes/test-draft/index.html && echo "FAIL: draft was published" || echo "PASS: draft filtered out"
```

Expected: "PASS: draft filtered out"

Remove the test draft:
```bash
rm /c/Users/ckq17/Desktop/plahground/src/content/notes/test-draft.md
```

- [ ] **Step 4: Run dev server for visual check**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && npm run dev
```

Expected: Dev server starts at `http://localhost:4321`. Open it and verify:
- Home page shows both module cards and the ResNet note
- `/notes` shows the note list with tag filter
- `/notes/hello-world` shows the full note with metadata
- `/achievements` shows the milestone with type filter
- `/achievements/hello-world` shows the achievement detail
- `/about` shows the about page
- Dark mode works (toggle system preference)

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: final build verification, draft filtering confirmed"
```

---

### Task 14: Vercel Deployment Prep

**Files:**
- Create: `.gitignore` (update with Astro entries)

- [ ] **Step 1: Update .gitignore for Astro**

Ensure `.gitignore` contains:

```
node_modules/
dist/
.superpowers/
.astro/
```

Run:
```bash
cat /c/Users/ckq17/Desktop/plahground/.gitignore
```

If entries are missing, add them and commit.

- [ ] **Step 2: Verify npm run build works for Vercel**

Run:
```bash
cd /c/Users/ckq17/Desktop/plahground && rm -rf dist node_modules && npm install && npm run build
```

Expected: Clean install and build succeed. This simulates what Vercel does.

- [ ] **Step 3: Final commit**

```bash
git add .gitignore && git commit -m "chore: update gitignore for Astro build artifacts"
```

---

## Deployment Instructions

After all tasks are complete:

1. Create a GitHub repository
2. Push: `git remote add origin <repo-url> && git push -u origin master`
3. Go to [vercel.com](https://vercel.com) → New Project → Import the GitHub repo
4. Vercel auto-detects Astro — no config changes needed
5. Deploy. Every subsequent `git push` triggers auto-deploy.
