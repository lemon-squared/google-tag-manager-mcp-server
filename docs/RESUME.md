# Resume: Tag Manager MCP

Scaffold only. No Google API calls, no OAuth app, and no published packages. Start from this file.

The Analytics server is [lemon-squared/google-analytics-mcp](https://github.com/lemon-squared/google-analytics-mcp). Do not add GA4 tools here.

## Already shipped

| Repo | Role |
| --- | --- |
| [lemon-squared/signal](https://github.com/lemon-squared/signal) | Consent banner, `cookieDomain`, Next.js GTM loader. Sites pass their own domain and container id. |
| [lemon-squared/gtm-template-consent-mode](https://github.com/lemon-squared/gtm-template-consent-mode) | Consent Mode v2 web tag. Submitted to the Community Template Gallery on 22 Oct 2026. |
| [lemon-squared/gtm-template-workflows](https://github.com/lemon-squared/gtm-template-workflows) | Shared gallery-status workflow. |
| [Runur PR #11](https://github.com/lemon-squared/Runur-Monorepo/pull/11) | Marketing depends on the Signal repo and sets `cookieDomain: ".runur.co.uk"`. |

Server tags (Meta, Snap, TikTok, Reddit) are not repos yet. Each one will be `<vendor>-tag`, server container only, with a Tag Execution Consent Settings group: send always, or abort unless `ad_storage` is granted.

## This repository

TypeScript, formatted with Ultracite. The local CLI keeps client container data on the machine that holds the credentials.

| Path | Package | Status |
| --- | --- | --- |
| `packages/core` | `@lemon-squared/google-tag-manager-mcp-core` | `GtmAuthProvider` only. Tools go here. |
| `packages/cli` | `@lemon-squared/google-tag-manager-mcp` | Exits immediately and points at this file. |
| `apps/worker` | not created | Hosted OAuth, after the CLI is in use. |

`GtmAuthProvider.getAccessToken()` is the only auth seam. The CLI and a later worker both implement it. Tools never see how the token was obtained.

Credentials for the CLI, in order of preference for client work: a service account key, a refresh token, or a short-lived access token. One environment variable. Do not put that value in a committed `.cursor/mcp.json`.

When the CLI speaks MCP over stdio, user-level Cursor config is `~/.cursor/mcp.json` so every internal and client project can see it.

### Tools to add

- Accounts, containers, and workspaces
- Tags, triggers, variables, templates, built-in variables, and folders
- Versions, version headers, and environments
- User permissions and Google tag config
- Server container clients, destinations, transformations, and zones
- Auth status

### Signal-aware tools

Add these after generic container edits work:

- Import [gtm-template-consent-mode](https://github.com/lemon-squared/gtm-template-consent-mode) into a web container.
- Create the Lemon Signal tag on a Consent Initialization trigger.
- Require `analytics_storage` on the Google tag.
- Later, import each `<vendor>-tag` into a server container and set Tag Execution Consent Settings.

## Order of work

1. Implement the container tools in `packages/core`, then make `packages/cli` an stdio MCP server.
2. Add the Signal template tools on top of generic container edits.
3. Add a hosted OAuth worker only after the local CLI is what Cursor uses for client projects.

## Constraints

- Format with Ultracite (`bun run format`). The config extends `ultracite/biome/core`.
- Keep client Google data on the local CLI until a hosted worker exists.
