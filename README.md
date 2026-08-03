# Marijuana Fact Check

Production-ready static MVP for [marijuanafactcheck.com](https://marijuanafactcheck.com): a citation-first database of evidence-graded cannabis claims, with explicit uncertainty and medical/legal boundaries.

## Local development

```bash
npm ci
npm run test:all
```

`npm run test:all` is self-contained: it validates source HTML, builds and inspects the isolated `dist/` artifact, then launches an ephemeral local server for Playwright. Use `npm run serve` only for manual preview.

## Public routes

- `/claims/` launch evidence records
- `/methodology/` grading method and confidence standard
- `/sources/` evidence hierarchy and source register
- `/newsletter/` spam-protected evidence-update signup
- `/submit-claim/` spam-protected research queue
- `/corrections/`, `/disclosure/`, `/privacy/`, `/terms/`
- `/404.html` noindexed fallback for unknown routes

## Production operations

The allowlisted `dist/` artifact runs on Hoyack K3s behind the Shrubnet HTTPS edge. FormSubmit handles newsletter and claim intake; Plausible handles privacy-minimized aggregate analytics. Netlify remains an alternate static-host path through `netlify.toml`. See `docs/DEPLOYMENT.md` for deploy, verification, monitoring, and rollback.

## Boundaries

Adults 21+ only. No medical advice, legal advice, dosage guidance, dispensary affiliates, product sales, or unsupported health claims. Grades summarize cited evidence and do not predict an individual's outcome.

## Governance

Feature branches and pull requests only; CTO owns merge and production cutover. The CMO owns content cadence and acceptance; CRO and compliance review the commercial and risk boundaries. See `docs/` for concept, revenue, analytics, content operations, architecture, deployment, monitoring, rollback, and review handoff.
