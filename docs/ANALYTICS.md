# Analytics plan

No analytics script ships until an approved privacy-minimized provider and site ID are supplied. Never send claim text, email, health information, or URL query contents.

Events: `claim_open`, `methodology_open`, `newsletter_start`, `newsletter_submit`, `claim_submit`, `sponsor_inquiry`. Required dimensions: page, surface, campaign (`utm_source=mfc` where links are distributed), viewport class.

Weekly funnel: unique landing sessions → claim views → newsletter starts → successful submits. Freshness metrics: records reviewed on schedule, median age since review, overdue high-risk records.
