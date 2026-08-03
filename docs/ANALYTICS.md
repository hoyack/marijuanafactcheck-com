# Analytics runbook

## Platform
Plausible Analytics (privacy-first, no cookies, no personal data). Script included on all public pages via `<script defer data-domain="marijuanafactcheck.com" src="https://plausible.io/js/script.js"></script>`.

## Events tracked

### Page views
Automatic for all public routes.

### Custom conversion events
- `newsletter_submit`: fired on newsletter form submit button click (intent signal, not authoritative)
- `newsletter_subscribed`: authoritative — fires only on `/newsletter/thanks/` with `?subscribed=1` query param
- `claim_submit`: fired on claim submission form submit (intent signal)
- `claim_submitted`: authoritative — fires only on `/submit-claim/thanks/` with `?submitted=1` query param
- `claims_viewed`: page view on `/claims/`
- `methodology_viewed`: page view on `/methodology/`

### Implementation
Client script (`scripts/main.js`) initializes the Plausible queue and fires custom events. Conversion-view events are guarded: they require the specific query parameter to be present, preventing inflated counts from direct page loads or refreshes.

## Dashboard
- Public dashboard: not yet configured
- Internal dashboard: Plausible shared link for CMO and CRO

## Privacy
Plausible does not use cookies, fingerprinting, or cross-site tracking. No personal data collected. Compliant with privacy notice.

## Form delivery tracking
FormSubmit is the production form endpoint. Delivery is tracked via:
1. FormSubmit dashboard (delivery status per submission)
2. Inbox confirmation (manual spot-check)
3. Conversion event `newsletter_subscribed` or `claim_submitted` on thank-you page view
