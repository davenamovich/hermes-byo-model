// The model side of this kit. Everything an agent can run comes from YOUR OpenRouter account, so
// this file is the whole model configuration — there is no managed catalog behind it.

// Written into each new agent's config as its default model. The chat model picker can switch to
// any other model in the catalog per turn; this is just where a fresh agent starts.
// Model ids and prices: https://openrouter.ai/models
export const DEFAULT_MODEL = "claude-haiku-5-5";

// Default monthly LLM budget for a new agent, in USD. The proxy stops the agent with a 402 once
// month-to-date spend on your key reaches this; each agent's cap is editable in its Settings tab.
export const DEFAULT_SPEND_CAP_USD = 5;

// The models this app exposes. Empty = pass OpenRouter's whole catalog through (the default: the
// picker lists every model your key can reach). To offer a curated set instead, list the ids here
// — the proxy then filters GET /v1/models down to them AND rejects a chat turn on anything else,
// so an agent can't spend on a model you didn't allow:
//
//   export const ALLOWED_MODELS = ["moonshotai/kimi-k2.7-code", "anthropic/claude-sonnet-5"];
export const ALLOWED_MODELS: string[] = [];

// ai.starimg.ru returns token usage but no dollar `cost`, so spend is estimated from tokens.
// USD per 1M tokens. PLACEHOLDER RATES: replace with the gateway's real prices. A model not listed
// uses DEFAULT_PRICE. Cache reads bill at 10% of input and cache writes at 125%.
export interface Price {
  input: number;
  output: number;
}
export const DEFAULT_PRICE: Price = { input: 3, output: 15 };
export const MODEL_PRICES: Record<string, Price> = {
  "claude-haiku-5-5": { input: 1, output: 5 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  "claude-sonnet-5-5": { input: 3, output: 15 },
  "claude-sonnet-5": { input: 3, output: 15 },
  "claude-opus-5-5": { input: 15, output: 75 },
  "claude-opus-5": { input: 15, output: 75 },
};
