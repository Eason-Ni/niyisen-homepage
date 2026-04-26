# Eason Ni Personal Homepage

Static personal homepage for `niyisen.com`.

## Current Status

- Production domain: `https://niyisen.com`
- Hosting: GitHub Pages
- Custom domain file: `CNAME`
- Default language: English
- Supported languages: English and Chinese

## Local Preview

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## Deployment

The site is pure static HTML/CSS/JS. No server, database, build step, or paid runtime is required.

## Pre-Launch / Update Checklist

Before publishing a visible change:

1. Run local preview with `python3 -m http.server 8080`.
2. Check desktop and mobile screenshots.
3. Confirm `https://niyisen.com` returns the homepage.
4. Confirm `https://eason-ni.github.io/niyisen-homepage/` redirects to `niyisen.com`.
5. Confirm the language switch works and defaults to English.
6. Confirm the WeChat official account QR code displays in the contact section.
7. Run a safety scan before any public commit or push:

```bash
rg -n "/Users/|/private/var/|/var/folders/|api_key|apikey|secret|token|password|credential|access_key|private_key|BEGIN .*PRIVATE KEY|AKIA|sk-|ghp_|github_pat_" .
```

Do not publish local machine paths, API keys, tokens, credentials, logs, private notes, or internal links.
