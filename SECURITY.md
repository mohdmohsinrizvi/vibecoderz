# Security Policy

We take the security of VibeCoderz seriously. If you believe you have found a security vulnerability, please report it to us responsibly using the instructions below.

---

## Supported Versions

Only the latest release version of VibeCoderz is actively supported with security updates. 

| Version | Supported |
| ------- | --------- |
| Latest Release (main branch) | Yes |
| All past releases | No |

---

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security bugs.**

Instead, report vulnerabilities privately by emailing the maintainer at **[mohsinrizvi.dev@gmail.com](mailto:mohsinrizvi.dev@gmail.com)**.

Please include the following details in your report:
* A detailed description of the vulnerability and its potential impact.
* Step-by-step instructions (or a proof-of-concept script) to reproduce the vulnerability.
* Details of your testing environment (browser, OS version).

We will acknowledge receipt of your report within 48 hours and work with you to resolve the issue as quickly as possible.

---

## Security Best Practices

As a client-side React application running on Supabase, the security model relies on:
1. **Supabase Row Level Security (RLS)**: Access controls are enforced directly in the database.
2. **Input Sanitization**: User inputs must be sanitized before rendering to prevent Cross-Site Scripting (XSS).
3. **Environment Isolation**: Never bake private admin database keys into the client build (always use the anonymous key `VITE_SUPABASE_ANON_KEY`).
