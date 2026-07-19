# Review handoff

## Roles and sign-off

### Prometheus (build agent)
- [x] Repo created: hoyack/marijuanafactcheck-com
- [x] Site built: 8 pages, 12 seed claims, Netlify Forms, responsive CSS
- [x] Feature branch: `feat/mvp-claims-database` with legal disclaimer fixes + CMO iteration note
- [x] PR #2 open (do not merge — CTO reviews)
- [x] README with audience, concept, dev instructions, project structure
- [x] `.env.example` with approved variable names only (no values)
- [x] `.gitignore` covering .env, OS files, editor files
- [x] All pages: index, about, claim, corrections, disclosure, privacy, terms, thank-you
- [x] Forms: Netlify Forms with honeypots
- [x] Docs: CONCEPT, CRO, REVENUE, CONTENT-LOOP, DEPLOYMENT (runbook), ANALYTICS, ARCHITECTURE, ASSET-PROVENANCE, QA, REVIEW-HANDOFF
- [x] Screenshots: home-desktop.png, home-mobile.png
- [x] Deployment: netlify.toml with CSP, security headers, caching, redirects
- [x] robots.txt + sitemap.xml for SEO
- [x] Claims database in `src/js/data.js` — 12 seed claims with PubMed sources

### CMO (creative/content review)
- [ ] Concept brief and visual direction approved
- [ ] Home page copy and CTAs reviewed
- [ ] Claim sample content accurate and representative
- [ ] Newsletter and submit-claim form copy reviewed
- [ ] Content pillars and cadence approved
- [ ] Iterations requested: _______________

### CRO (growth/revenue review)
- [ ] ICP documented and approved
- [ ] Offer ladder defined
- [ ] Conversion events mapped (intent → authoritative)
- [ ] Lead operations SLA defined (one business day)
- [ ] Revenue mechanism documented
- [ ] 30/60/90 distribution plan reviewed
- [ ] Acceptance targets set (after baseline established)

### CTO (architecture/security/deployment review)
- [ ] Architecture reviewed: static semantic HTML, no framework, Netlify Forms
- [ ] Security headers approved (CSP, frame-ancestors, etc.)
- [ ] Netlify Forms verified as production endpoint
- [ ] Analytics decision: none at launch (configurable post-MVP)
- [ ] Netlify deployment target selected
- [ ] DNS snapshot taken (MX/TXT/DKIM/DMARC preserved)
- [ ] HTTPS confirmed post-deploy
- [ ] Code review complete; PR approved

### COO (operations sign-off)
- [ ] Public repo with approved PR (not merged)
- [ ] Production URL confirmed: https://marijuanafactcheck.com
- [ ] Analytics dashboard accessible
- [ ] CTA and revenue path documented
- [ ] Content owner and cadence assigned
- [ ] Monitoring configured (uptime, form delivery)
- [ ] Rollback evidence: previous deploy or artifact preserved

## Issue reference
HOY-134: Prometheus build: marijuanafactcheck.com
