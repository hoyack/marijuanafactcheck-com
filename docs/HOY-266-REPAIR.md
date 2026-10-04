# HOY-266 repair handoff

Marijuana Fact Check
- Base: feat/production-mvp-v2 at 6ab41b8.
- Replaced both FormSubmit paths with native Netlify forms mfc-newsletter and mfc-claim; same-origin success actions, hidden identities, declared honeypots, consent, and existing metadata. Removed retired CSP origin and updated processor/privacy/hosting docs. Removed automatic-email-confirmation promise.
- Updated obsolete inactive dist test to current route/field contracts and included it in test:all. Added desktop/mobile overflow and numerical contrast regressions; fixed stat-grid overflow, CTA contrast, disclaimer contrast, and light-background lead text.
- npm run test:all passed: 13 static pages, 12 browser routes, two built form contracts and 17 required publish files. Final axe checks on home, both forms and both success pages at 1440/390: no A/AA violations, overflow, or failed local resources.

## Release status
Branch implementation only. No merge, production deploy, DNS change, or hosted form submission was performed. Local tests cannot prove Netlify detection, acceptance, notification, newsletter enrollment, or checklist fulfillment. Native forms MUST NOT be deployed to the existing plain static K3s host.

CTO owns the unblock: arrange authorized Netlify preview access with automatic form detection, deploy these reviewed SHAs to non-production previews, submit uniquely tagged synthetic requests, and record form IDs/submission IDs plus dashboard/API readback and success-route evidence. Growth/Revenue Operations owns downstream notification and fulfillment proof.

The runtime exposes no usable Netlify credential; Paperclip connection search returned HTTP 401 (missing runtime-tools token). No credentials were requested in comments or exposed.

## Evidence
Screenshots: docs/screenshots/hoy-266/ (desktop 1440 and mobile 390). Raw browser/a11y results and cross-property native-form audit: /home/hoyack/paperclip-work/HOY-266/qa/.

Other sites were audited, not modified: Montgomery Hoyack, TX Pentest and ScrapeToken native markup passes static detection requirements. TX Pentest publishes the repo root and has a desktop nav CTA contrast failure; ScrapeToken has an eyebrow contrast failure at both widths. Netlify-hosted acceptance is unproven for every audited form.
