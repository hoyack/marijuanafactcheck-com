# Review handoff

## Roles and sign-off

### Prometheus (build agent)
- [x] Repo created: hoyack/marijuanafactcheck-com
- [x] Feature branch: `feat/production-mvp-v2`
- [x] All source files committed with meaningful messages
- [x] PR #3 opened and intentionally left unmerged
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
- [x] Concept brief and visual direction approved
- [x] Home page copy and CTAs reviewed
- [x] Claim sample content accurate and representative
- [x] Newsletter and submit-claim form copy reviewed
- [x] Content pillars and cadence approved
- [x] Live creative accepted after Wave C imagery deployment

Evidence: HOY-123, HOY-205, HOY-208, HOY-216, and HOY-217.

### CRO (growth/revenue review)
- [x] ICP documented and approved
- [x] Offer ladder defined
- [x] Conversion events mapped (intent → authoritative)
- [x] Lead operations SLA defined (one business day)
- [x] Revenue mechanism documented
- [x] 30/60/90 distribution plan reviewed
- [x] Acceptance targets set (after baseline established)

Evidence: HOY-124 and marijuanafactcheck.com-specific CRO acceptance in HOY-178.

### CTO (architecture/security/deployment review)
- [x] Architecture reviewed: static semantic HTML, no framework
- [x] Security headers approved (CSP, frame-ancestors, etc.)
- [x] FormSubmit path verified as production endpoint
- [x] Plausible analytics configured with correct domain
- [x] K3s static-edge deployment target selected and applied
- [x] DNS snapshot taken (MX/TXT/DKIM/DMARC preserved)
- [x] HTTPS and real-404 behavior confirmed post-deploy
- [x] Code/security review and source/live parity closeout completed in Paperclip

Evidence: HOY-177, HOY-179, HOY-184, HOY-185, HOY-188, HOY-190, HOY-195, and HOY-196. PR #3 remains open and mergeable; no formal GitHub review has been submitted.

### COO (operations sign-off)
- [ ] Formal GitHub PR approval recorded (PR #3 remains open and unmerged)
- [x] Production URL confirmed: https://marijuanafactcheck.com
- [ ] Plausible dashboard access/domain registration confirmed by an account owner
- [x] CTA and revenue path documented
- [x] Content owner and cadence assigned
- [x] HTTPS uptime monitoring configured
- [x] Rollback evidence: prior deployment artifacts/revisions preserved
- [ ] Controlled FormSubmit inbox delivery proven

## Open closure gates

1. Activate FormSubmit for `hello@hoyack.com` and prove a controlled newsletter or claim submission reaches the designated inbox with attribution intact. This requires human mailbox access and is tracked on HOY-192.
2. Record formal approval on GitHub PR #3.
3. Confirm `marijuanafactcheck.com` is registered and receiving events in the Plausible dashboard.

## Issue reference
HOY-134: Prometheus build: marijuanafactcheck.com
