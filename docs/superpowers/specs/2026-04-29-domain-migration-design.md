# Domain Migration: hoikei-chan.vercel.app → hoikei.top

## Motivation

`vercel.app` domain is inaccessible from mainland China. A custom domain `hoikei.top` (purchased on Alibaba Cloud) will replace it so the site is reachable for domestic visitors.

## Scope

- Primary domain: `hoikei.top`
- `www.hoikei.top` redirects to `hoikei.top`
- DNS fully managed by Vercel (Approach A)
- No changes to deployment pipeline or architecture

## Steps

### 1. Add custom domain in Vercel

- Dashboard → Project → Settings → Domains → Add `hoikei.top`
- Vercel returns nameserver addresses

### 2. Update NS records at Alibaba Cloud

- Log into Alibaba Cloud domain console
- Change DNS servers from Alibaba defaults to Vercel-provided nameservers
- Wait for DNS propagation (minutes to hours)

### 3. Vercel auto-configuration

- SSL certificate provisioning (Let's Encrypt)
- Enable `www.hoikei.top` → `hoikei.top` redirect in Vercel Domains settings

### 4. Code changes

Two files:

- `astro.config.mjs:6` — update `site` from `https://hoikei-chan.vercel.app` to `https://hoikei.top`
- `src/content/achievements/first-website.md:14` — update domain text reference

### 5. Verify

- `npm run build`
- Push to master → Vercel auto-deploy
- Confirm `https://hoikei.top` loads, SSL valid, www redirect works

## Out of scope

- Retaining old `hoikei-chan.vercel.app` as active (it will still resolve but won't be the canonical URL)
- Email or other DNS records (not needed for a personal academic site)
- CDN / caching layer changes
