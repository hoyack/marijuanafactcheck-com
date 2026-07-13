# Architecture and security

Static HTML/CSS/JS deployed to Netlify. No application server, account system, database, checkout, or client-side health personalization. Netlify Forms handles the newsletter and claim queue with named honeypots. Hidden CRM values are classification tags only, not secrets.

Security headers deny framing, restrict capabilities, prevent MIME sniffing, and constrain content sources. No inline script or committed secrets. External evidence links are ordinary navigation and are not embedded. Form-delivery proof and destination access must be verified after the deploy by CTO.
