# Deployment runbook

## Hosting
The `dist/` artifact is a self-contained static site deployable to:
1. **Netlify** (primary): edge-first static hosting. `netlify.toml` configures build, headers, redirects, and CSP.
2. **Hoyack K3s** (alternate): static file server behind the Shrubnet HTTPS edge.

## Netlify deployment
```bash
npm run build
# Deploy dist/ via Netlify CLI or Git-connected auto-deploy
```
- Build command: `npm run build`
- Publish directory: `dist`
- Custom 404 served as real HTTP 404 (not a soft redirect to home)
- All unknown routes return 404 via catch-all redirect in `netlify.toml`

## K3s deployment
The Nginx configuration must replicate Netlify semantics:
```
location / {
    try_files $uri $uri/ =404;
    error_page 404 /404.html;
}
```
- Serve `dist/` as the webroot
- Unknown routes return HTTP 404 with the custom 404 page
- The K3s config must not fall back to index.html for unknown routes

## DNS
- Domain: marijuanafactcheck.com
- Preserve existing MX, TXT, DKIM, and DMARC records
- CTO snapshots DNS before any cutover
- HTTPS enforced; HSTS considered post-stabilization

## Verification (post-deploy)
1. `curl -I https://marijuanafactcheck.com/` → 200, correct headers
2. `curl -I https://marijuanafactcheck.com/nonexistent` → 404, custom 404 body
3. FormSubmit test: submit newsletter form, confirm thank-you page and email delivery
4. Plausible dashboard: confirm page views registering
5. `robots.txt` and `sitemap.xml` accessible
6. All policy pages load: privacy, terms, disclosure, corrections

## Monitoring
- Uptime: Plausible or external monitor (e.g., Upptime)
- Form delivery: manual check on first deploy, then spot-check monthly
- Broken links: CI catches static link rot; external link checker for outbound source URLs

## Rollback
- Netlify: redeploy previous deploy from dashboard or CLI
- K3s: `kubectl rollout undo` or restore previous `dist/` artifact
- DNS: revert CNAME/A record to previous target; TTL-aware timing
