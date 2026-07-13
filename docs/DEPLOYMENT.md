# Netlify deployment, monitoring, and rollback

## Deploy
1. CTO snapshots current A/AAAA/CNAME/MX/TXT/DKIM/DMARC records. 2. Merge only the approved PR. 3. Create/import the Netlify site from the public repository with publish directory `.` and build command from `netlify.toml`. 4. Verify both Netlify forms are detected; submit synthetic records and confirm authorized delivery. 5. Add the custom domain without changing MX/TXT. 6. Apply approved DNS changes, issue TLS, and verify apex + www behavior.

## Verification
Run `npm ci && npm run test:all`; check every public route, canonical, sitemap, robots, CSP, TLS chain, 404 behavior, desktop/mobile screenshots, and analytics consent decision. Test forms with synthetic non-health data.

## Monitoring
5-minute HTTPS uptime and certificate-expiry monitor; weekly broken-link/source check; monthly Lighthouse and form-delivery canary. Alert owner: CTO/on-call; content freshness: editorial owner.

## Rollback
Use Netlify atomic deploy rollback to the last verified deploy. If DNS cutover itself fails, restore the snapshotted web-only records. Never roll back or overwrite MX/TXT/DKIM/DMARC. Disable forms if abuse or misdelivery is detected.
