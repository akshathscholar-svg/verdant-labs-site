'use server';

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type PlantResult = {
  commonName: string;
  scientificName: string;
  family: string;
  difficulty: string;
  light: string;
  water: string;
  humidity: string;
  temperature: string;
  soil: string;
  toxicity: string;
  estimatedCost: string;
  funFact: string;
  summary: string;
};

export type IdentifyResponse =
  | { ok: true; result: PlantResult }
  | { ok: false; error: string };

export async function identifyPlant(
  imageBase64: string,
): Promise<IdentifyResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return { ok: false, error: 'API key not configured.' };
  }

  // Basic size validation (~10 MB base64 limit)
  if (imageBase64.length > 15_000_000) {
    return { ok: false, error: 'Image is too large. Please use an image under 10 MB.' };
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 800,
      messages: [
        {
          role: 'system',
          content: `You are a botanical expert for Verdant Labs. Identify the plant in the image and return ONLY valid JSON matching this exact schema (no markdown, no code fences):
{
  "commonName": "string",
  "scientificName": "string",
  "family": "string",
  "difficulty": "Easy | Moderate | Advanced",
  "light": "brief care instruction",
  "water": "brief care instruction",
  "humidity": "brief care instruction",
  "temperature": "ideal range in °F",
  "soil": "brief soil preference",
  "toxicity": "Toxic to pets | Toxic to pets and humans | Non-toxic",
  "estimatedCost": "$X – $Y range for a typical specimen",
  "funFact": "one interesting fact",
  "summary": "2-3 sentence species overview"
}
If the image does not clearly show a plant, return: {"error": "Could not identify a plant in this image. Please try a clearer photo of a plant."}`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageBase64, detail: 'low' },
            },
            {
              type: 'text',
              text: 'Identify this plant. Return only JSON.',
            },
          ],
        },
      ],
    });

    const raw = response.choices[0]?.message?.content?.trim() ?? '';

    // Strip potential markdown code fences
    const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();

    const parsed = JSON.parse(cleaned);

    if (parsed.error) {
      return { ok: false, error: parsed.error };
    }

    return { ok: true, result: parsed as PlantResult };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    if (msg.includes('Could not process image') || msg.includes('invalid_image')) {
      return { ok: false, error: 'Could not process the image. Please try a different photo.' };
    }
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
