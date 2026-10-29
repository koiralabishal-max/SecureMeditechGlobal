import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION, generateDomainFallback } from '@/lib/chat';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ChatMessage = { role: string; parts?: { text?: string }[] };

let ai: GoogleGenAI | null = null;
function getClient() {
  if (!ai) ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return ai;
}

export async function POST(req: Request) {
  let messages: ChatMessage[] | undefined;
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Messages array is required' }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.parts?.[0]?.text || '';

  // Without an API key, answer from the built-in domain specialist knowledge
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ text: generateDomainFallback(lastUserMessage) });
  }

  try {
    const generatePromise = getClient().models.generateContent({
      model: 'gemini-3.8-flash',
      contents: messages,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI generation timeout after 6 seconds')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    if (response?.text) {
      return Response.json({ text: response.text });
    }
  } catch (err) {
    console.warn('Live Gemini model call fell back to local domain specialist:', (err as Error)?.message || err);
  }

  return Response.json({ text: generateDomainFallback(lastUserMessage) });
}
