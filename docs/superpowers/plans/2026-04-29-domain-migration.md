# Domain Migration: hoikei-chan.vercel.app → hoikei.top

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Astro personal website from Vercel subdomain `hoikei-chan.vercel.app` to custom domain `hoikei.top` so the site is accessible from mainland China.

**Architecture:** Two code changes (Astro site config and one content reference) plus DNS/Vercel domain setup. DNS is managed by Vercel via nameserver delegation from Alibaba Cloud.

**Tech Stack:** Astro v6, Vercel (deploy), Alibaba Cloud (registrar)

---

### Task 1: Update Astro site config

**Files:**
- Modify: `astro.config.mjs:6`

- [ ] **Step 1: Change `site` URL**

```js
// astro.config.mjs line 6
// Before:
site: 'https://hoikei-chan.vercel.app',
// After:
site: 'https://hoikei.top',
```

- [ ] **Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: update site URL to hoikei.top"
```

---

### Task 2: Update achievement content reference

**Files:**
- Modify: `src/content/achievements/first-website.md:14`

- [ ] **Step 1: Update domain text in achievement**

The last line of the achievement body reads `域名 hoikei-chan.vercel.app。` — change to `域名 hoikei.top。`

- [ ] **Step 2: Commit**

```bash
git add src/content/achievements/first-website.md
git commit -m "chore: update domain reference in first-website achievement"
```

---

### Task 3: Build and verify locally

- [ ] **Step 1: Run build**

```bash
cd C:/Users/ckq17/Desktop/plahground && npm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 2: Push to deploy**

```bash
git push origin master
```

Expected: Vercel auto-deploys. Site should still work at `hoikei-chan.vercel.app`.

---

### Task 4: Add custom domain in Vercel Dashboard

*Manual step — must be done in browser.*

- [ ] **Step 1: Add domain**

Go to Vercel Dashboard → `personal-website` project → Settings → Domains → enter `hoikei.top` → Add.

Vercel will display required nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

- [ ] **Step 2: Note the nameserver addresses**

Write down the exact nameserver hostnames Vercel provides. You'll need them for Task 5.

---

### Task 5: Update NS records at Alibaba Cloud

*Manual step — must be done in browser.*

- [ ] **Step 1: Change DNS servers**

Log into Alibaba Cloud → Domain Console → `hoikei.top` → DNS Management → Modify DNS Servers.

Replace the default Alibaba Cloud nameservers with the Vercel nameservers from Task 4.

- [ ] **Step 2: Wait for propagation**

DNS changes can take a few minutes to a few hours. Check status in Vercel Domains page — it will show a green check when DNS is verified.

---

### Task 6: Enable www redirect in Vercel

*Manual step — must be done in browser.*

- [ ] **Step 1: Add www subdomain**

In Vercel Domains, add `www.hoikei.top`. Vercel will auto-configure it.

- [ ] **Step 2: Set redirect**

In the domain settings for `www.hoikei.top`, set it to redirect to `hoikei.top` (302 redirect).

---

### Task 7: Final verification

- [ ] **Step 1: Verify primary domain**

Open `https://hoikei.top` in browser. Confirm:
- Page loads correctly
- SSL certificate is valid (padlock icon)
- All pages and assets load

- [ ] **Step 2: Verify www redirect**

Open `https://www.hoikei.top` → should redirect to `https://hoikei.top`.

- [ ] **Step 3: Test from within China**

Ask a friend in China, or use a VPN to exit from a Chinese IP, to confirm `hoikei.top` is accessible.
