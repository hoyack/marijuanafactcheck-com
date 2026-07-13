# Production deployment, monitoring, and rollback

## Current production path

Production is the allowlisted `dist/` artifact on Hoyack K3s behind the Shrubnet edge. The approved artifact may be reconstructed from the open feature PR only when the commit SHA and artifact checks pass. Netlify remains an alternate static-host path through `netlify.toml`.

## Deploy

1. Run `npm ci && npm run test:all && npm audit --audit-level=moderate`.
2. Snapshot A/AAAA/CNAME and all MX/TXT/DKIM/DMARC records. Never alter mail DNS for a web deploy.
3. Build `dist/` and verify the artifact contains only allowlisted public files.
4. Package/apply the site ConfigMap and nginx/CSP configuration; roll only `site-marijuanafactcheck-com`. Nginx must use `try_files $uri $uri/ =404` with `error_page 404 /404.html`; do not route unknown paths to `/index.html`.
5. Verify distinct 200 responses for all public routes, real 404 responses with the noindexed custom page for unknown/source-only paths, apex and `www` TLS, HSTS/security headers, Plausible markup, FormSubmit actions/honeypots/guarded redirects, and source-only-path isolation.
6. Confirm MX and SPF still match the pre-deploy snapshot.
7. Test forms only with synthetic non-health data and authorized inbox access. If FormSubmit first-use activation is pending, activate `hello@hoyack.com` before treating inbox delivery as operational.

## Monitoring

Prometheus Blackbox probes `https://marijuanafactcheck.com` every 30 seconds with HTTP/TLS alerts and certificate-expiry warning. The CTO/on-call owns availability and delivery incidents. The CMO owns content freshness, source-link health, and the publishing cadence.

## Rollback

Re-apply the last verified site ConfigMap/package and roll `site-marijuanafactcheck-com`; do not touch MX/TXT/DKIM/DMARC. Recheck public routes, TLS, headers, forms, analytics, and mail DNS. Disable the form endpoint if abuse or misdelivery is detected. Netlify deployments may use atomic deploy rollback when that hosting path is active.
