# Architecture and security

The application is static HTML/CSS/JS built into an allowlisted `dist/` artifact. Production runs on Hoyack K3s behind the Shrubnet HTTPS edge. Netlify remains a supported alternate static host through `netlify.toml`, but it is not the current production source of truth.

The build excludes repository metadata, documentation, tests, screenshots, environment examples, package manifests, and source-only scripts from the public artifact. There is no application server, account system, database, checkout, or client-side health personalization.

FormSubmit handles the newsletter and claim queue. Both forms use POST, provider and secondary honeypots, required privacy consent, guarded success redirects, and the non-secret CRM tags `source:mfc` and `offer:mfc-media`. Form delivery terminates at `hello@hoyack.com`; no health or claim text is sent to analytics. Success events require the FormSubmit redirect marker, which is removed from browser history after one page load.

Plausible provides privacy-minimized aggregate analytics. Security headers deny framing, restrict capabilities, prevent MIME sniffing, and constrain scripts, connections, form actions, fonts, images, and base URLs. No secrets are committed. External evidence links are ordinary navigation and are not embedded.
