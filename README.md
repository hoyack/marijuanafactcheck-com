# Marijuana Fact Check

**Evidence-graded cannabis claims database.** Every claim is rated, cited, dated, and uncertainty-tagged. Medical and legal disclaimers are mandatory. Corrections are transparent and timestamped.

## Audience & Problem

Cannabis information online is dominated by marketing copy, forum anecdotes, and outdated studies. Consumers, patients, journalists, and policymakers lack a single, trustworthy source that grades claims by evidence quality, links to primary sources, and clearly separates fact from speculation.

Marijuana Fact Check fills that gap — a non-partisan, citation-backed reference that earns trust through transparency, not volume.

## Concept Brief

- **Positioning:** The "Snopes meets Cochrane Review" for cannabis claims — accessible summaries backed by rigorous sourcing.
- **Information Architecture:** Claim cards with evidence grade (A–F), source links, uncertainty notes, last-reviewed date, and correction history.
- **Visual Direction:** Clean, clinical, high-contrast. Medical-journal aesthetic with modern web readability. No cannabis-leaf clip art.
- **Content Pillars:** Health & Medicine, Law & Policy, Science & Chemistry, Market & Industry, History & Culture.
- **Revenue Hypothesis:** Compliant sponsorship (no product endorsements), premium research reports, newsletter with sponsored content, and consulting referrals.
- **CTA:** "Submit a claim for review," newsletter signup, research report downloads.

## Tech Stack

- **Static site** (HTML/CSS/JS) — no framework, no build step
- **Netlify** for hosting, forms, and edge functions
- **Vanilla JS** for claim filtering, search, and interactivity
- **JSON-driven** claims database for easy content updates

## Getting Started

```bash
# Clone
git clone git@github.com:hoyack/marijuanafactcheck-com.git
cd marijuanafactcheck-com

# Serve locally
python3 -m http.server 8080 --directory src
# Open http://localhost:8080
```

No build step, no dependencies. Edit HTML/CSS/JS directly.

## Environment Variables

See `.env.example` for required variables. Copy to `.env` for local development:
```bash
cp .env.example .env
```

## Deployment

See `docs/deployment-runbook.md` for Netlify deployment instructions, DNS configuration, and rollback procedures.

## Content Operations

See `docs/analytics-content-loop.md` for content cadence, review cycles, freshness metrics, and editorial workflow.

## Project Structure

```
├── README.md
├── .gitignore
├── .env.example
├── netlify.toml
├── docs/
│   ├── deployment-runbook.md
│   └── analytics-content-loop.md
└── src/
    ├── index.html          # Homepage with claim browser
    ├── claim.html          # Individual claim detail page
    ├── about.html          # About / methodology
    ├── privacy.html        # Privacy policy
    ├── terms.html          # Terms of use
    ├── disclosure.html     # Sponsorship & affiliate disclosure
    ├── corrections.html    # Correction log
    ├── css/
    │   └── style.css       # All styles (responsive, accessible)
    ├── js/
    │   ├── app.js          # Claim loader, search, filter
    │   └── data.js         # Claims database (JSON)
    ├── robots.txt
    └── sitemap.xml
```

## License

All content © Marijuana Fact Check. Code: MIT License.
