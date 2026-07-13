# QA evidence

Verified locally before opening the implementation PR and revalidated after the production analytics/form cutover.

## Automated checks

- `npm run validate`: HTML validation across 13 public routes plus the custom 404 page.
- `npm run test:static`: public pages, canonical metadata, 1200×630 PNG social metadata, noindexed confirmation/404 pages, one H1 per route, compliance boundaries, Hoyack footer, Plausible markup, FormSubmit delivery controls, guarded success markers, CRM tags, and local links.
- `npm run test:dist`: allowlisted isolated deploy artifact; both FormSubmit actions, provider/secondary honeypots, guarded redirects, CRM tags, custom 404 page, and source-only exclusions.
- `npm test`: 13 production-artifact routes at 1440×900 and 390×844; HTTP 200, one H1, mobile menu, form controls, guarded success-event behavior, real unknown-route 404 behavior, and zero console/page errors.
- `npm audit --audit-level=moderate`: zero known vulnerabilities at the recorded verification.
- All six launch evidence citations returned HTTP 200 after redirects at launch verification.

## Visual review

Desktop and mobile full-page screenshots were reviewed for clipping, overlap, hierarchy, visible disclaimer treatment, responsive cards, CTA prominence, and tap-target sizing.

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/home-mobile.png`

## Production verification

Production serves distinct routes over HTTPS with HSTS and restrictive security headers. Plausible markup and conversion hooks are live. Both forms POST to FormSubmit with `_honey`, a secondary honeypot, privacy consent, CRM tags, and explicit success redirects. Prometheus Blackbox monitoring and TLS-expiry alerts are active. DNS verification preserves IONOS MX and the combined Mailgun/IONOS SPF record. Authorized inbox owners must complete FormSubmit first-use activation if it remains pending.
