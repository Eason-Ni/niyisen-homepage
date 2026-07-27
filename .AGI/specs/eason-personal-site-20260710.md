# Eason Personal Site 2026-07-10

## Goal

Create and publish a focused personal website for Eason Ni using the Sites-compatible build path in this repository.

## Scope

- Keep the site as a single-page personal website.
- Preserve useful existing assets: GitHub avatar reference, favicon, WeChat official account QR code, English and Chinese copy.
- Add a Sites/Vinext build structure so the site can be validated and published through Sites.
- Archive the previous root static entry under `legacy-static/` so the Sites app is the active root page.

## Non-Scope

- No database, login, upload, newsletter, CMS, or external data connector.
- No change to DNS or GitHub Pages production settings.
- No public credential, token, or private local path exposure.

## Validation

- Install dependencies.
- Run a local development preview.
- Run `npm run build`.
- Package and publish through Sites when build succeeds.

## Stop Conditions

- Dependency installation or Sites publishing is blocked by account, network, quota, or credential errors.
- Build output cannot produce `dist/server/index.js`.
- Sensitive content is detected before publishing.
