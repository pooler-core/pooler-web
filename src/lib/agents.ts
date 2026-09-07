export type AgentKind = "crawler" | "assistant" | "browser" | "unknown";

export type KnownAgent = {
  /** Case-insensitive substring of the user-agent string. */
  token: string;
  name: string;
  operator: string;
  kind: AgentKind;
};

/**
 * Deliberately small and readable rather than exhaustive. This runs in the
 * visitor's browser, so it can only ever describe a client that executes JS —
 * which most crawlers do not. It is here so a visitor can see what we would
 * have concluded about them, not as a security control.
 */
export const KNOWN_AGENTS: KnownAgent[] = [
  { token: "GPTBot", name: "GPTBot", operator: "OpenAI", kind: "crawler" },
  { token: "OAI-SearchBot", name: "OAI-SearchBot", operator: "OpenAI", kind: "crawler" },
  { token: "ChatGPT-User", name: "ChatGPT-User", operator: "OpenAI", kind: "assistant" },
  { token: "ClaudeBot", name: "ClaudeBot", operator: "Anthropic", kind: "crawler" },
  { token: "Claude-SearchBot", name: "Claude-SearchBot", operator: "Anthropic", kind: "crawler" },
  { token: "Claude-User", name: "Claude-User", operator: "Anthropic", kind: "assistant" },
  { token: "Google-Extended", name: "Google-Extended", operator: "Google", kind: "crawler" },
  { token: "Googlebot", name: "Googlebot", operator: "Google", kind: "crawler" },
  { token: "PerplexityBot", name: "PerplexityBot", operator: "Perplexity", kind: "crawler" },
  { token: "Perplexity-User", name: "Perplexity-User", operator: "Perplexity", kind: "assistant" },
  { token: "Amazonbot", name: "Amazonbot", operator: "Amazon", kind: "crawler" },
  { token: "Applebot-Extended", name: "Applebot-Extended", operator: "Apple", kind: "crawler" },
  { token: "Applebot", name: "Applebot", operator: "Apple", kind: "crawler" },
  { token: "meta-externalagent", name: "meta-externalagent", operator: "Meta", kind: "crawler" },
  { token: "Bytespider", name: "Bytespider", operator: "ByteDance", kind: "crawler" },
  { token: "CCBot", name: "CCBot", operator: "Common Crawl", kind: "crawler" },
  { token: "cohere-ai", name: "cohere-ai", operator: "Cohere", kind: "crawler" },
  { token: "bingbot", name: "bingbot", operator: "Microsoft", kind: "crawler" },
  { token: "HeadlessChrome", name: "Headless Chrome", operator: "unattributed", kind: "unknown" },
  { token: "Puppeteer", name: "Puppeteer", operator: "unattributed", kind: "unknown" },
  { token: "Playwright", name: "Playwright", operator: "unattributed", kind: "unknown" },
  { token: "python-requests", name: "python-requests", operator: "unattributed", kind: "unknown" },
  { token: "curl/", name: "curl", operator: "unattributed", kind: "unknown" },
];

export function detectAgent(userAgent: string): KnownAgent | null {
  const ua = userAgent.toLowerCase();
  // First match wins, so longer/more specific tokens are listed above their
  // shorter prefixes (Applebot-Extended before Applebot).
  return (
    KNOWN_AGENTS.find((agent) => ua.includes(agent.token.toLowerCase())) ?? null
  );
}
