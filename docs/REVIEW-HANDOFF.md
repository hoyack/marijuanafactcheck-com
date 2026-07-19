# Review handoff

## Roles and sign-off

### Prometheus (build agent)
- [x] Repo created: hoyack/marijuanafactcheck-com
- [x] Feature branch: `feat/production-mvp`
- [x] All source files committed with meaningful messages
- [x] PR opened (do not merge)
- [x] README with local dev, architecture, boundaries, governance
- [x] `.env.example` with approved variable names only (no values)
- [x] `.gitignore` covering node_modules, dist, artifacts, .env, OS files
- [x] All pages: index, claims, methodology, sources, newsletter, submit-claim, corrections, disclosure, privacy, terms, 404
- [x] Forms: FormSubmit with honeypots, consent, source/offer tags
- [x] Build: `npm run build` → isolated `dist/` artifact
- [x] Tests: `npm run test:all` passes (static + browser against dist/)
- [x] CI: GitHub Actions workflow on push/PR
- [x] Docs: CONCEPT, CRO, REVENUE, CONTENT-LOOP, DEPLOYMENT, ANALYTICS, ARCHITECTURE, ASSET-PROVENANCE, QA, REVIEW-HANDOFF

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
- [ ] Architecture reviewed: static semantic HTML, no framework
- [ ] Security headers approved (CSP, frame-ancestors, etc.)
- [ ] FormSubmit path verified as production endpoint
- [ ] Plausible analytics configured with correct domain
- [ ] Netlify/K3s deployment target selected
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
