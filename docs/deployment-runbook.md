# Deployment Runbook — Marijuana Fact Check

## Infrastructure

| Component | Provider | Details |
|-----------|----------|---------|
| Hosting | Netlify | Static site, no server-side runtime |
| DNS | IONOS (existing) | `marijuanafactcheck.com` |
| Forms | Netlify Forms | Claim submissions, newsletter |
| Analytics | Plausible (planned) | Privacy-focused, no cookies |
| SSL | Netlify (auto) | Let's Encrypt, auto-renew |

## Initial Deployment

### 1. Netlify Site Setup

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Link to site
cd marijuanafactcheck-com
netlify init
# Select: Create & configure a new site
# Team: hoyack
# Site name: marijuanafactcheck-com
```

### 2. DNS Configuration

**CRITICAL:** Preserve existing MX, TXT, DKIM, and DMARC records. Only modify A/AAAA/CNAME records.

The domain `marijuanafactcheck.com` is managed at IONOS. Configure:

```
Type    Name    Value                  TTL
CNAME   www     marijuanafactcheck-com.netlify.app    3600
A       @       Netlify Load Balancer IP (75.2.60.5)  3600
```

For apex domain: Use Netlify's managed DNS or point to Netlify's load balancer IP.

**DO NOT modify:**
- MX records (email)
- TXT records (SPF, DKIM verification)
- DMARC records

### 3. Environment Variables

Set in Netlify dashboard (Site settings > Environment variables):
```
GOOGLE_ANALYTICS_ID= (add when ready)
PLAUSIBLE_DOMAIN= (add when ready)
```

### 4. Deploy

```bash
# Deploy to production
netlify deploy --prod --dir=src

# Or via Git push (recommended):
git push origin main
# Netlify auto-deploys on push to main
```

### 5. Verify

```bash
# Check HTTPS
curl -I https://marijuanafactcheck.com

# Verify DNS resolution
dig marijuanafactcheck.com A
dig www.marijuanafactcheck.com CNAME

# Check SSL cert
openssl s_client -connect marijuanafactcheck.com:443 -servername marijuanafactcheck.com
```

## DNS Preservation Checklist

Before any DNS change:
- [ ] Export current zone file from IONOS
- [ ] Document all MX records
- [ ] Document all TXT records (SPF, DKIM, DMARC, verification tokens)
- [ ] Document all CNAME records
- [ ] Confirm email continuity — send test email before and after
- [ ] Set low TTL (300) before changes, restore to 3600 after verification

## Rollback Procedure

```bash
# 1. Revert DNS to previous values (from zone export)
# 2. Or redeploy a previous Netlify deploy:
netlify deploy --prod --dir=src
# Select the previous deploy from the list
```

## Staging

```bash
# Deploy to a staging URL (branch deploy)
git checkout -b staging
git push origin staging
# Netlify creates: staging--marijuanafactcheck-com.netlify.app
```

## Monitoring

- Netlify dashboard: deploy status, form submissions, bandwidth
- Uptime: status.netlify.com (Netlify) + external monitor (recommended)
- Forms: Netlify dashboard > Forms (check spam folder regularly)
- SSL: auto-renewed; check Netlify dashboard for expiration warnings

## Netlify Configuration Reference

`netlify.toml` (root of repo):
- Build command: none (static site, no build step)
- Publish directory: `src`
- Redirects: SPA fallback, API proxy
- Headers: Security (CSP, HSTS, X-Frame-Options), caching
