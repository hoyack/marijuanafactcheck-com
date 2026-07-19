# QA evidence

## Automated checks

### HTML validation
- All HTML pages present and valid (8 pages: index, about, claim, corrections, disclosure, privacy, terms, thank-you)
- Every page has: `<title>`, `<meta description>`, `<link rel="canonical">`, exactly one `<h1>`, footer with medical disclaimer
- No broken internal links (href pointing to missing files)
- Required site files present: README.md, .env.example, netlify.toml, robots.txt, sitemap.xml

### Content validation
- 12 seed claims in `src/js/data.js` — each with id, text, summary, evidence, verdict (A-F grade), category, PubMed sources, uncertainty rating, last-reviewed date
- All source URLs resolve to PubMed or institutional (.gov, .who.int) domains
- Medical disclaimer present in all page footers
- Legal disclaimer present on corrections, disclosure, privacy, and terms pages
- Corrections page includes correction policy and placeholder for future entries
- Disclosure page covers sponsorship, affiliate, and editorial independence

### Form validation
- Newsletter form: Netlify Forms with `data-netlify="true"`, honeypot field (`bot-field`), required email field
- Claim submission form: Netlify Forms with `data-netlify="true"`, honeypot field, required claim text field, optional source URL and email
- Both forms POST to `/thank-you.html` on success
- Thank-you page includes `noindex` robots meta

### Deployment config
- `netlify.toml`: publishes `src/`, security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- CSP allows `unsafe-inline` for styles and scripts (required for inline SVG and dynamic content)
- Immutable cache headers on `/assets/*`
- `robots.txt`: allows all crawlers, points to sitemap
- `sitemap.xml`: lists all 8 HTML pages with lastmod dates

### Responsive design
- CSS uses custom properties and responsive breakpoints
- Mobile nav toggle with hamburger menu
- `prefers-reduced-motion` support
- System font stack (no web font requests)

## Manual verification checklist
- [ ] Netlify deploy successful; HTTPS confirmed
- [ ] Netlify Forms: newsletter signup delivers to configured email
- [ ] Netlify Forms: claim submission delivers to configured email
- [ ] All 8 pages load with correct HTTP 200
- [ ] Custom 404 handling configured in Netlify
- [ ] DNS: MX/TXT/DKIM/DMARC preserved
- [ ] Mobile: responsive layout verified at 375px, 768px, 1024px
- [ ] Keyboard navigation: all interactive elements reachable
- [ ] Screen reader: landmark navigation works
- [ ] Search/filter: claim browser filters by text, category, grade, verdict
- [ ] Claim detail page renders with evidence grade, sources, and verdict
