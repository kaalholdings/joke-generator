import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Create OpenAI client configured for Vercel AI Gateway
const openai = createOpenAI({
  baseURL: 'https://gateway.vercel.ai/v1',
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

export async function POST() {
  const result = streamText({
    model: openai('openai/gpt-4o'),
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
