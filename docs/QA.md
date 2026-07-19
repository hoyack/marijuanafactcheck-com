# QA evidence

## Automated checks

### Static validation (`npm run test:static`)
- All HTML pages present and complete (≥11 pages including custom 404)
- Every page has: `<title>`, `<meta description>`, `<link rel="canonical">`, exactly one `<h1>`, Hoyack footer, and Plausible analytics script
- No broken internal links (href/src pointing to missing files)
- Required docs present: README.md, .env.example, netlify.toml, robots.txt, sitemap.xml, scripts/build.mjs, and all docs/*.md files
- Build script includes 404.html in dist/ artifact
- Netlify config publishes `dist/` and returns real 404 for unknown routes

### Browser validation (`npm test`)
- All routes return correct HTTP status and page content
- Home page: correct title, h1, CTA, and at least 3 grade-badged claims
- Claims page: search input present, at least 4 claim cards
- Newsletter form: correct FormSubmit action, honeypot fields, consent checkbox, source/offer hidden fields
- Newsletter thank-you: conversion view guard with `data-conversion-view` and `data-conversion-param`
- Submit-claim form: correct FormSubmit action, required fields, consent checkbox
- 404 page: noindex robots meta, custom h1 text
- Privacy page names FormSubmit and Plausible as data processors
- Analytics script: Plausible queue initialized before custom events in main.js

### CI
- GitHub Actions workflow runs `npm run test:all` on push and PR
- `test:all` = build + validate + static test + browser test (against dist/)

## Manual verification checklist
- [ ] Netlify deploy successful; HTTPS confirmed
- [ ] FormSubmit test: newsletter signup delivers email
- [ ] FormSubmit test: claim submission delivers email
- [ ] Plausible dashboard shows page views
- [ ] All redirects work (trailing-slash, catch-all 404)
- [ ] DNS: MX/TXT/DKIM/DMARC preserved
- [ ] Mobile: responsive layout verified at 375px, 768px, 1024px
- [ ] Keyboard navigation: all interactive elements reachable
- [ ] Screen reader: landmark navigation works
