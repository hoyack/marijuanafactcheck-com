# CRO brief

## ICP
Journalists covering health/science/cannabis beats, policy analysts and legislative staff, healthcare communicators, and evidence-literate adults (21+) who need citable evidence evaluation for cannabis claims they encounter professionally or personally.

## Offer ladder
1. Free evidence newsletter with new evaluations, grade changes, and corrections
2. Future sponsored research reports with institutional-grade evidence synthesis
3. Future institutional access (API, bulk data, custom reports)
4. Carefully disclosed grants and editorial sponsorships

Paid offerings are hypotheses until launched. Sponsored content will be clearly labeled and editorially separated from public claim evaluations.

## Conversion events
- `newsletter_submit`: UI intent when the visitor presses submit on the newsletter form
- `newsletter_subscribed`: authoritative client conversion when FormSubmit returns the visitor to `/newsletter/thanks/`
- `claim_submit`: UI intent on claim submission form
- `claim_submitted`: authoritative conversion on submit-claim thank-you page
- `claims_viewed` and `methodology_viewed`: supporting content engagement

The event map is `newsletter_submit` (intent) → FormSubmit processing → `newsletter_subscribed` (success-page view). Do not treat submit-button clicks as delivered subscribers.

## Lead operations
Growth/Revenue Operations owns the `hello@hoyack.com` newsletter intake. The owner verifies each accepted subscription, records the source and offer tags, and sends a welcome confirmation within one business day. Delivery failures or a missing FormSubmit activation are escalated to CTO; consent and unsubscribe requests are handled by Growth/Revenue Operations with Privacy support.

## Revenue mechanism
No near-term revenue required. Establish audience, trust, and citation authority first. Sponsored research reports test institutional willingness to pay. Grants and editorial sponsorships require clear labeling and editorial independence guarantees. No cannabis product advertising or affiliate revenue.

## 30 / 60 / 90 distribution
- 30: publish 12-15 seed claims with full evidence evaluations; distribute via journalist and policy networks; measure landing-to-newsletter conversion.
- 60: publish methodology deep-dives; pitch as cited source to health/science journalists; measure newsletter-to-submission progression.
- 90: evaluate sponsored research report demand; decide whether institutional access product deserves discovery.

## Acceptance targets
No invented baselines. Establish the first 30-day baseline, then target: form delivery success above 98%, source capture above 95%, first touch within one business day, and monthly review of conversion by channel.
