# Architecture

## Overview
Marijuana Fact Check is a static HTML/CSS/JS site with no build-time framework. Semantic HTML, shared CSS via a single stylesheet, and minimal vanilla JavaScript. Served directly from `src/` via Netlify.

## Stack
- **HTML:** semantic, accessible, single `<h1>` per page, skip links, ARIA labels
- **CSS:** single `src/css/style.css` with custom properties, responsive breakpoints, reduced-motion support
- **JS:** single `src/js/app.js` for mobile nav toggle, search/filter, and dynamic content
- **Forms:** Netlify Forms (spam-protected with honeypot fields)
- **Analytics:** None active at MVP launch; privacy policy identifies future analytics processors
- **Hosting:** Netlify (static site with edge functions)

## Route map
```
/                       → src/index.html (home)
/about.html             → src/about.html
/claim.html             → src/claim.html
/corrections.html       → src/corrections.html
/disclosure.html        → src/disclosure.html
/privacy.html           → src/privacy.html
/terms.html             → src/terms.html
/thank-you.html         → src/thank-you.html
/robots.txt             → src/robots.txt
/sitemap.xml            → src/sitemap.xml
```

## Security
- CSP: `default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://api.netlify.com`
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Forms use honeypot fields (`bot-field`) for bot protection via Netlify Forms
- No cookies, no localStorage, no third-party trackers
- Immutable cache headers on `/assets/*`

## Performance
- Static HTML, no framework JavaScript
- Single CSS file (~6KB), single JS file (~6KB)
- No web fonts (system font stack)
- SVG favicon (no raster requests)

## Accessibility
- Skip-to-content link on every page
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- ARIA labels on nav, search, and form elements
- Focus-visible outlines
- `prefers-reduced-motion` support
- Grade badges use text labels, not color alone

## Data
- Claims database in `src/js/data.js` as a JavaScript array
- 12 seed claims with evidence grades (A-F), verdicts, PubMed sources, uncertainty ratings
- Each claim has: id, text, summary, evidence, verdict, grade, category, sources[], uncertainty, lastReviewed
