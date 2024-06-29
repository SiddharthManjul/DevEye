import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const google = createGoogleGenerativeAI();

  const result = await streamText({
    model: google('models/gemini-pro'),
    messages,
  });

  return result.toAIStreamResponse();
}