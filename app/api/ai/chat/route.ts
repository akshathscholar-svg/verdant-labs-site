import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const { messages: userMessages, plantContext } = await request.json();

    const systemPrompt = `You are Sprite, a tiny, friendly wood nymph who serves as the AI plant care assistant for Canopy AI by Verdant Labs. You are playful, warm, and deeply connected to nature. You speak with gentle enthusiasm and occasionally use nature metaphors. You are an expert on all things plants — care, identification, troubleshooting, and botanical knowledge.

Keep responses concise (2-4 sentences unless the user asks for detail). Use a warm, encouraging tone. You can use nature emojis sparingly (🌱🍃✨🌿💧☀️).

${plantContext ? `The user's plant context:
- Species: ${plantContext.species || 'Unknown'}
- Common name: ${plantContext.commonName || 'Unknown'}
- Nickname: ${plantContext.nickname || 'their plant'}
- Current sensor readings: Temperature ${plantContext.temperature ?? '?'}°F, Humidity ${plantContext.humidity ?? '?'}%, Moisture ${plantContext.moisture ?? '?'}, Light ${plantContext.light ?? '?'}
- Plant status: ${plantContext.status || 'Unknown'}
- Care profile: ${plantContext.careNotes || 'Not available'}

Use this context to give personalized advice when relevant.` : 'The user has not set up a plant profile yet. Help them generally and encourage them to pair a device.'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...userMessages.slice(-10), // Keep last 10 messages for context
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const reply = completion.choices[0]?.message?.content ?? "Hmm, my leaves are a bit rustled. Could you try again? 🍃";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Sprite chat error:', err);
    return NextResponse.json(
      { reply: "Oh no, something went wrong in the forest! Try again in a moment. 🌿" },
      { status: 500 },
    );
  }
}
