# Analytics operations

Plausible is the approved privacy-minimized provider. Every public HTML page loads `https://plausible.io/js/script.js` with `data-domain="marijuanafactcheck.com"`. The content security policy permits only that analytics script and connection origin.

Custom events are derived from `data-conversion` values. Current intent events include `header_newsletter`, `newsletter_submit`, and `claim_submit`. The form intent events fire only after native browser validation passes. FormSubmit redirects successful requests with `?submitted=1`; the confirmation pages then emit the authoritative `newsletter_requested` or `claim_submitted` event and immediately remove the marker so refreshes do not duplicate conversions. Direct confirmation-page visits without the marker do not count. Future editorial surfaces may add `claim_open`, `methodology_open`, `newsletter_start`, and `sponsor_inquiry` after review.

Never send claim text, form values, email addresses, health information, or free-text URL data as event properties. The only current custom property is the page path.

Weekly funnel: unique landing sessions → intent events → authoritative requested/submitted events. Freshness metrics: records reviewed on schedule, median age since review, overdue high-risk records.

Operations: the CTO/on-call owns the Plausible site configuration; confirm `marijuanafactcheck.com` exists in the dashboard and review event delivery after deploy. Analytics failure must not block content or form operation.
