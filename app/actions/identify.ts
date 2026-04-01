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
  waterFrequency: string;
  humidity: string;
  temperature: string;
  soil: string;
  toxicity: string;
  estimatedCost: string;
  funFact: string;
  summary: string;
  indoorOutdoor: string;
  growingZones: string;
  matureSize: string;
  growthRate: string;
  plantingSeason: string;
  harvestSeason: string;
  propagation: string;
  commonProblems: string;
  companionPlants: string;
  fertilizerNeeds: string;
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

  // Basic size validation (~4 MB base64 limit for server actions)
  if (imageBase64.length > 6_000_000) {
    return { ok: false, error: 'Image is too large. Please use a smaller image.' };
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1200,
      messages: [
        {
          role: 'system',
          content: `You are a botanical expert for Verdant Labs. Identify the plant in the image and return ONLY valid JSON matching this exact schema (no markdown, no code fences):
{
  "commonName": "string",
  "scientificName": "string",
  "family": "string",
  "difficulty": "Easy | Moderate | Advanced",
  "light": "brief light requirement",
  "water": "brief watering instruction",
  "waterFrequency": "e.g. Every 7-10 days, or When top 2 inches dry",
  "humidity": "brief humidity preference",
  "temperature": "ideal range in °F",
  "soil": "brief soil preference",
  "toxicity": "Toxic to pets | Toxic to pets and humans | Non-toxic",
  "estimatedCost": "$X – $Y range for a typical specimen",
  "indoorOutdoor": "Indoor | Outdoor | Both",
  "growingZones": "USDA zones e.g. 9-11",
  "matureSize": "height x spread at maturity",
  "growthRate": "Slow | Moderate | Fast",
  "plantingSeason": "best season/months to plant",
  "harvestSeason": "harvest time if applicable, or N/A for ornamentals",
  "propagation": "primary propagation method(s)",
  "commonProblems": "1-2 common issues to watch for",
  "companionPlants": "2-3 good companion plants",
  "fertilizerNeeds": "brief fertilizer recommendation",
  "funFact": "one interesting fact",
  "summary": "2-3 sentence species overview for a plant enthusiast"
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
    console.error('Identify error:', msg);
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
