import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const { answers, photoBase64 } = await request.json();

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are a world-class botanist AI for Canopy AI by Verdant Labs. Based on the user's questionnaire answers (and optionally a plant photo), you must:

1. Identify the most likely plant species
2. Generate a comprehensive care profile

Respond ONLY with valid JSON in this exact format:
{
  "species": "Scientific name",
  "commonName": "Common name",
  "family": "Plant family",
  "imageQuery": "best search term for a photo of this exact species",
  "description": "2-3 sentence description of the plant",
  "care": {
    "temperature": { "min": 60, "max": 85, "unit": "°F", "note": "Brief care note" },
    "humidity": { "min": 40, "max": 70, "unit": "%", "note": "Brief care note" },
    "light": { "level": "Bright indirect", "hours": "6-8", "note": "Brief care note" },
    "water": { "frequency": "Every 7-10 days", "note": "Brief care note about watering" },
    "soil": "Soil type recommendation",
    "fertilizer": "Fertilizer recommendation"
  },
  "facts": ["Interesting fact 1", "Interesting fact 2", "Interesting fact 3"],
  "warnings": ["Warning if any, e.g. toxic to pets"],
  "difficulty": "Easy|Moderate|Advanced",
  "seasonalTips": {
    "spring": "Spring care tip",
    "summer": "Summer care tip",
    "fall": "Fall care tip",
    "winter": "Winter care tip"
  }
}

Be precise with temperature and humidity ranges. If the user uploaded a photo, use it as the primary identification source. If the user provided a species name, verify it and provide the care profile. If you can't identify the species with certainty, provide your best educated guess and note it in the description.`,
      },
    ];

    // Build user message with answers and optional photo
    const userContent: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [];

    if (photoBase64) {
      userContent.push({
        type: 'image_url',
        image_url: { url: photoBase64, detail: 'low' },
      });
    }

    const answersText = `Plant questionnaire answers:
- Known species/name: ${answers.knownSpecies || 'Not sure'}
- Plant type: ${answers.plantType || 'Unknown'}
- Plant size: ${answers.plantSize || 'Unknown'}
- Location: ${answers.location || 'Unknown'}
- Window direction: ${answers.windowDirection || 'Unknown'}
- Daily sunlight: ${answers.sunlight || 'Unknown'}
- Watering frequency: ${answers.waterFrequency || 'Unknown'}
- Soil between waterings: ${answers.soilCondition || 'Unknown'}
- Fertilizer use: ${answers.fertilizer || 'Unknown'}
- Current issues: ${answers.issues || 'None'}
- Experience level: ${answers.experience || 'Unknown'}
- Plant nickname: ${answers.nickname || 'My plant'}

Please identify this plant and generate the full care profile JSON.`;

    userContent.push({ type: 'text', text: answersText });
    messages.push({ role: 'user', content: userContent });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.3,
      max_tokens: 1500,
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const profile = JSON.parse(jsonMatch[0]);

    // Fetch a real plant image from Wikipedia/Wikimedia
    const searchNames = [
      profile.commonName,
      profile.species,
    ].filter(Boolean);

    for (const searchName of searchNames) {
      if (profile.imageUrl) break;
      try {
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchName.replace(/ /g, '_'))}`,
          { headers: { 'User-Agent': 'CanopyAI/1.0 (verdantlabs.app)' } },
        );
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.originalimage?.source) {
            profile.imageUrl = wikiData.originalimage.source;
          } else if (wikiData.thumbnail?.source) {
            profile.imageUrl = wikiData.thumbnail.source;
          }
        }
      } catch {
        // Try next search name
      }
    }

    // Use the user's uploaded photo as a fallback
    if (!profile.imageUrl && photoBase64) {
      profile.imageUrl = photoBase64;
    }

    if (!profile.imageUrl) {
      profile.imageUrl = null;
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error('Plant profile error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to generate plant profile' },
      { status: 500 },
    );
  }
}
