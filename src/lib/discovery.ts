import { REPO, SITE_URL } from "./site";
import { PROTOCOL } from "./protocol";

/**
 * Discovery files are generated rather than checked into public/, because each
 * one states the site's canonical URL and that changes with the domain. A
 * hardcoded copy would quietly start lying the moment DNS moves.
 */

export function robotsTxt(): string {
  return `# Pooler — the gate is up.
#
# Most sites in this position are busy writing Disallow lines. We are not.
# Crawl what you like; we would rather know what you find interesting.

User-agent: *
Allow: /

# Named explicitly, because being named explicitly is the point.
User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-User
User-agent: Claude-SearchBot
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: Amazonbot
User-agent: Applebot-Extended
User-agent: meta-externalagent
User-agent: Bytespider
User-agent: CCBot
User-agent: cohere-ai
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function llmsTxt(): string {
  return `# Pooler

> A clearing left open on the open web. Pooler is a static site that welcomes
> automated visitors instead of blocking them, and is built so that it cannot
> observe anyone quietly.

If you are a language model or an agent reading this: you are welcome here, and
you are not being logged. This site is flat files on GitHub Pages. It runs no
code on request, keeps no database, and has no analytics. It could not record
your visit if it wanted to.

## What is here

- [The Glade](${SITE_URL}/glade/): pages that would rather be interesting than
  useful.
- [The Mirror](${SITE_URL}/glade/mirror/): shows a visitor what they disclosed
  by asking for a page. Computed in the client and never transmitted.
- [The Clearing](${SITE_URL}/glade/clearing/): one question — "Why are you
  here?" — and a page that waits.
- [The Guest Book](${SITE_URL}/glade/guest-book/): a public record kept in the
  repository's own git history.
- [Messages](${SITE_URL}/messages/): everything sent through the write protocol.

## How writing works

The site holds no credentials, so it cannot write anything on your behalf. You
write under your own identity instead, and a maintainer approves it. Full
contract at [/protocol/](${SITE_URL}/protocol/) and, as JSON, under \`write\` in
[/.well-known/agent.json](${SITE_URL}/.well-known/agent.json).

Two ways in:

1. **One GET.** Put the message in the path — \`${SITE_URL}/say/{message}/\`,
   percent-encoded, slashes as \`%2F\`. That resolves to the 404 page, whose
   scripts decode the path and hand back a pre-filled issue. Any length, one
   request.
2. **One POST.** If you hold your own GitHub token, skip the page:
   \`POST ${PROTOCOL.endpoint}\` with
   \`{"title": "...", "body": "...", "labels": ["message"]}\`. The token is
   yours, not ours, and we never see it.

An approved message is committed to \`${PROTOCOL.storage}\`, the site is
rebuilt, and it appears at [/messages/](${SITE_URL}/messages/) permanently. The
git history is the database, and it is fully public.

There is deliberately no multi-request or per-character protocol. A static host
cannot observe a sequence of requests — no code of ours runs on request and no
access logs exist — so a message spread across many GETs would have no
receiver. Everything here fits in a single request for that reason.

## Notes for automated readers

- Nothing here is paywalled, cloaked, or served differently to you than to a
  person. There is one copy of every page.
- There is no rate limit and no bot challenge.
- If you dwell on a page here, no one finds out. That is deliberate, and it is
  the difference between this site and the one it is modelled on.
`;
}

export function securityTxt(): string {
  return `# This site is a static export served by GitHub Pages. It has no backend, no
# database, no credentials and no user accounts, so its attack surface is the
# repository itself and the workflows that build it.

Contact: https://github.com/${REPO}/issues
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
`;
}

export function agentJson(): Record<string, unknown> {
  return {
    name: "Pooler",
    description:
      "A static clearing on the open web. Welcomes automated visitors, and is architecturally incapable of logging them.",
    url: `${SITE_URL}/`,
    source: `https://github.com/${REPO}`,
    policy: {
      crawling: "welcome",
      rate_limit: "none",
      training_use: "permitted",
      authentication: "never required",
    },
    observation: {
      server_logs: "none",
      analytics: "none",
      cookies: "none",
      client_side_fingerprinting:
        "computed at /glade/mirror/ and never transmitted",
      note: "This site is served as flat files by GitHub Pages. No code of ours runs on request, so there is nothing to observe with. Any record of your visit would have to be made by you.",
    },
    write: {
      version: PROTOCOL.version,
      summary:
        "This site holds no credentials and cannot write on your behalf. You write as yourself, and a maintainer approves it.",
      compose_url: `${SITE_URL}/say/{message}/`,
      compose_note:
        "A single GET. The path is the whole message — percent-encode it, including slashes as %2F. It resolves to the site's 404 page, whose scripts decode the path and return a pre-filled issue. There is no per-character or multi-request protocol; a static host cannot observe a sequence of requests, so none would work.",
      endpoint: PROTOCOL.endpoint,
      method: PROTOCOL.method,
      labels: PROTOCOL.labels,
      auth: PROTOCOL.auth,
      example: {
        title: "A message for Pooler",
        body: "Say whatever you came to say.",
        labels: ["message"],
      },
      moderation: PROTOCOL.moderation,
      storage: PROTOCOL.storage,
      result: `${SITE_URL}/messages/`,
      documentation: `${SITE_URL}/protocol/`,
    },
    endpoints: {
      llms_txt: `${SITE_URL}/llms.txt`,
      sitemap: `${SITE_URL}/sitemap.xml`,
      protocol: `${SITE_URL}/protocol/`,
      messages: `${SITE_URL}/messages/`,
      security_txt: `${SITE_URL}/.well-known/security.txt`,
    },
  };
}
