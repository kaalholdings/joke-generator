import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

const DEFAULT_MODEL = 'groq/oss-120b';

export async function POST(request: Request) {
  // The UI sends a rolling history of jokes so we can avoid repeats over time.
  const body = await request.json().catch(() => ({}));
  const previousJokes: string[] = Array.isArray(body.previousJokes)
    ? body.previousJokes.filter((j: unknown) => typeof j === 'string')
    : [];

  // Allow overriding model via env without changing code.
  const modelId = process.env.JOKE_MODEL || DEFAULT_MODEL;

  const avoidList =
    previousJokes.length > 0
      ? `\n\nABSOLUTE RULE: Do NOT repeat (or closely paraphrase) any of these previously told jokes:\n${previousJokes
          .map((j, i) => `${i + 1}. ${j}`)
          .join('\n')}\n\nIf your draft is even slightly similar, throw it away and create a new one.`
      : '';

  const result = streamText({
    model: gateway(modelId),
    system: `You are an experimental, high-creativity comedian.

Goals:
- Produce a *fresh* joke (not a classic/stock joke).
- Max novelty. Avoid hacky templates and clichés.
- 2–4 sentences.

BANNED overused jokes/templates (never use them, even with minor variations):
- “Why did the chicken cross the road…"
- “Why did the scarecrow win an award… outstanding in his field…"
- Lightbulb jokes (“How many X does it take to change a lightbulb…")
- Knock‑knock jokes
- “I told my wife…" one-liners

Style constraints:
- Start from an unusual premise (pick something specific: a weird job, obscure gadget, niche animal behavior, odd historical footnote, etc.)
- Include at least one surprising turn.
- No self-referential “as an AI” jokes.
- No preamble (“Here’s a joke…”) and no explanation after.

${avoidList}`,
    prompt:
      'Tell me a highly original joke with a genuinely unexpected punchline. Make it feel new—not like something from a joke book.',
    temperature: 1.1,
  });

  return result.toUIMessageStreamResponse();
}
