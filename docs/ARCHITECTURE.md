# Architecture

## Overview
Marijuana Fact Check is a static HTML/CSS/JS site with no build-time framework. Semantic HTML, shared CSS via a single stylesheet, and minimal vanilla JavaScript. The `dist/` artifact is an isolated, self-contained directory published to Netlify or served from K3s.

## Stack
- **HTML:** semantic, accessible, single `<h1>` per page, skip links, ARIA labels
- **CSS:** single `styles/main.css` with custom properties, responsive breakpoints, reduced-motion support
- **JS:** single `scripts/main.js` for mobile nav toggle, copyright year, conversion event guards, and claim search filter
- **Forms:** FormSubmit (spam-protected with honeypot fields and consent checkboxes)
- **Analytics:** Plausible (script loaded via defer, no cookies)
- **Build:** `scripts/build.mjs` copies allowlisted files into isolated `dist/`

## Route map
```
/                           → index.html (home)
/claims/                    → claims/index.html
/methodology/               → methodology/index.html
/sources/                   → sources/index.html
/newsletter/                → newsletter/index.html
/newsletter/thanks/         → newsletter/thanks/index.html
/submit-claim/              → submit-claim/index.html
/submit-claim/thanks/       → submit-claim/thanks/index.html
/privacy/                   → privacy/index.html
/terms/                     → terms/index.html
/disclosure/                → disclosure/index.html
/corrections/               → corrections/index.html
/404.html                   → custom 404 (noindexed)
```

## Security
- CSP: `default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://plausible.io; connect-src 'self' https://plausible.io; form-action 'self' https://formsubmit.co; frame-ancestors 'none'; base-uri 'self'`
- No inline scripts or event handlers
- Forms use honeypot fields (`_honey`, `bot-field`) for bot protection
- No cookies, no localStorage, no third-party trackers beyond Plausible
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Performance
- Static HTML, no framework JavaScript
- Single CSS file (~10KB uncompressed), cacheable for 1 hour
- Single JS file (~1.5KB), defer-loaded
- No web fonts (system font stack)
- No images beyond OG card (single PNG in assets/)
- All pages under ~8KB HTML

## Accessibility
- Skip-to-content link on every page
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- ARIA labels on nav, search, and form elements
- Focus-visible outlines
- `prefers-reduced-motion` support
- Grade badges use text, not color alone
