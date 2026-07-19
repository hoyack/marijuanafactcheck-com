# Analytics & Content Loop — Marijuana Fact Check

## Content Operations

### Cadence
| Activity | Frequency | Owner |
|----------|-----------|-------|
| New claim review | 2x/week minimum | Editorial |
| Evidence update (existing claim) | As new research publishes | Editorial |
| Newsletter | Weekly (digest of new reviews) | Editorial |
| Research report | Monthly (deep-dive topic) | Editorial |
| Correction | Within 24h of verified error | Editorial |
| Analytics review | Weekly | Operations |

### Content Pipeline

```
Claim Submission → Triage → Research → Draft Review → Publish → Monitor → Update
```

1. **Submit:** Public submits claims via form or email; editorial team identifies trending topics
2. **Triage:** Score by public interest, controversy level, research availability, urgency
3. **Research:** Literature review (PubMed, Google Scholar, clinicaltrials.gov), source verification
4. **Draft:** Write evidence summary, assign grade/verdict/uncertainty, compile sources
5. **Review:** Second reviewer checks sources, grades, disclaimers
6. **Publish:** Add to `js/data.js`, deploy
7. **Monitor:** Track page views, social shares, correction requests
8. **Update:** Re-review when new research publishes or grade ages past review threshold

### Freshness Metrics

| Grade | Re-review Interval | Flag if last reviewed > |
|-------|-------------------|------------------------|
| A (Strong) | 12 months | 18 months |
| B (Moderate) | 12 months | 18 months |
| C (Limited) | 6 months | 12 months |
| D (Weak) | 6 months | 12 months |
| F (Debunked) | 18 months | 24 months |

### Content Templates

#### Claim Review Template
```
Claim: [Exact text]
Verdict: [Mostly True / Mixed / Mostly False / False / Unproven]
Grade: [A-F]
Summary: [2-3 sentences, plain language]
Evidence: [2-3 paragraphs, cite sources inline]
Sources: [Label + URL, verified accessible]
Uncertainty: [Low/Medium/High]
Last Reviewed: [YYYY-MM-DD]
```

#### Correction Template
```
Date: [YYYY-MM-DD]
Claim: [Identifier]
Original: [What was wrong]
Correction: [What changed]
Reason: [Why — new evidence, source error, etc.]
```

## Analytics

### Key Metrics

| Metric | Tool | Target |
|--------|------|--------|
| Monthly unique visitors | TBD (Plausible planned) | 5,000 (Month 3) |
| Claims viewed per session | TBD | 3+ |
| Newsletter signup rate | Netlify Forms | 2% of visitors |
| Claim submission rate | Netlify Forms | 5% of visitors |
| Time on page | TBD | 2+ min |
| Bounce rate | TBD | <50% |
| Organic search traffic | Google Search Console | 60%+ of total |
| Social referral traffic | TBD | Growing monthly |
| Returning visitors | TBD | 20%+ (Month 6) |

### Content Performance

Track per-claim:
- Page views (total, weekly)
- Average time on page
- Scroll depth
- Source click-through rate
- Social shares
- Correction requests

Use this data to:
- Identify high-interest topics for research reports
- Prioritize re-review of popular claims
- Guide newsletter content selection

### Revenue Tracking

| Source | Tracking Method | Target (Month 6) |
|--------|----------------|-------------------|
| Sponsorship | Revenue dashboard | $1,000/mo |
| Premium reports | Purchase tracking | $500/mo |
| Newsletter sponsorship | Email analytics | $300/mo |
| Consulting referrals | Referral link tracking | $200/mo |

## Approvals & Review Gates

### Content Approval
1. **Creator** writes draft (editorial team member)
2. **Reviewer** verifies: sources accurate, grade consistent with evidence, disclaimers present
3. **Publisher** deploys to production

### CMO Review (Creative/Content)
- Monthly content review: is positioning consistent? Are disclaimers prominent?
- Quarterly brand audit: visual identity, voice, audience alignment
- Ad hoc: any sponsored content, research reports before publication

### CRO Review (Revenue)
- Monthly: revenue dashboard, conversion tracking, sponsorship pipeline
- Quarterly: revenue model review, pricing, ICP refinement
- 30/60/90-day distribution plan updates

### CTO Review (Technical)
- Pre-deployment: architecture review, security scan, DNS preservation check
- Code review: all PRs, meaningful commits, no secrets
- Merge approval: CTO merges all PRs (Prometheus does not merge)
- Deployment: CTO delegates or executes deployment

### COO Review (Operations)
- Pre-closure: repo exists, PR approved, production URL live, analytics configured, CTA present, revenue path defined, content owner assigned, content cadence documented, monitoring active, rollback evidence

## Compliance

### Disclaimers
- Every page: Medical disclaimer in footer
- Every page: Legal disclaimer in footer
- Claim pages: Medical/legal context in evidence review
- Sponsored content: Prominent "Sponsored" label + disclosure link

### Corrections
- Public log: /corrections.html
- Timestamped: Date + what changed + why
- Notification: Update newsletter and social if material

### Privacy
- Analytics must be cookie-less or consent-exempt (Plausible planned)
- Newsletter: double opt-in (if using external provider)
- No third-party trackers, ad pixels, or social media embeds that track
