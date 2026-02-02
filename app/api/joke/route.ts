import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function POST() {
  const result = streamText({
    model: gateway('openai/gpt-4o'),
    system: `You are a hilarious comedian who tells short, clever jokes. 
Your jokes should be:
- Family-friendly and appropriate for all ages
- Clever with good punchlines
- Varied in style (puns, one-liners, observational humor, etc.)
- About 2-4 sentences max

Just tell the joke directly, no preamble like "Here's a joke:" or explanations after.`,
    prompt: 'Tell me a random, funny joke!',
  });

  return result.toTextStreamResponse();
}
