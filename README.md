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

## Boundaries

Adults 21+ only. No medical advice, legal advice, dosage guidance, dispensary affiliates, product sales, or unsupported health claims. Grades summarize cited evidence and do not predict an individual's outcome.

## Governance

Feature branches and pull requests only; CTO owns merge and production cutover. CMO acceptance and compliance review are required. See `docs/` for concept, CRO, analytics, content operations, architecture, deployment, monitoring, rollback, and review handoff.
