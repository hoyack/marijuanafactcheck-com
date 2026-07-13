# QA evidence

Verified locally on 2026-07-12 before opening the implementation PR.

## Automated checks

- `npm run validate`: PASS — HTML validation across all 13 routes.
- `npm run test:static`: PASS — 13 pages, canonical metadata, one H1 per route, compliance boundary, Hoyack footer, two Netlify forms, required CRM tags, and all local links.
- `npm test`: PASS — 13 routes at 1440×900 and 390×844; HTTP 200, one H1, mobile menu, newsletter fields, and zero console/page errors.
- `npm audit --audit-level=moderate`: PASS — 0 known vulnerabilities.
- Lighthouse, local production-equivalent static server: Performance 95; Accessibility 100; Best Practices 100; SEO 100.
- All six external launch citations returned HTTP 200 after redirects.

## Visual review

Desktop and mobile full-page screenshots were reviewed for clipping, overlap, hierarchy, visible disclaimer treatment, responsive cards, CTA prominence, and tap-target sizing. The grid-based evidence-desk visual system rendered cleanly in both viewports.

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/home-mobile.png`

## Production-only gates

Netlify form detection/delivery, approved analytics configuration, custom-domain DNS preservation, production TLS, uptime monitoring, and rollback evidence require the CTO-owned deploy. Synthetic form tests must not contain health information.
