import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase-server';
import { supabase } from '@/app/lib/supabase';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }
  const res = await fetch('https://api2.arduino.cc/iot/v1/clients/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ARDUINO_CLIENT_ID!,
      client_secret: process.env.ARDUINO_CLIENT_SECRET!,
      audience: 'https://api2.arduino.cc/iot',
    }),
  });
  if (!res.ok) throw new Error('Arduino auth failed: ' + res.status);
  const json = await res.json();
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cachedToken.token;
}

async function getArduinoData(thingId: string) {
  const token = await getToken();
  const res = await fetch(
    'https://api2.arduino.cc/iot/v2/things/' + thingId + '/properties',
    { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' },
  );
  if (!res.ok) throw new Error('Arduino API error: ' + res.status);
  const properties: Array<{ variable_name: string; last_value: unknown; value_updated_at: string }> = await res.json();
  const map: Record<string, unknown> = {};
  let latestUpdate = '';
  for (const p of properties) {
    map[p.variable_name] = p.last_value;
    if (p.value_updated_at > latestUpdate) latestUpdate = p.value_updated_at;
  }
  return {
    plantName: String(map.plantName ?? 'Unknown'),
    plantStatus: String(map.plantStatus ?? 'Unknown'),
    moisture: Number(map.moisture ?? 0),
    moistureLabel: String(map.moistureLabel ?? 'Unknown'),
    light: Number(map.light ?? 0),
    lightLabel: String(map.lightLabel ?? 'Unknown'),
    temperature: Number(map.temperature ?? 0),
    humidity: Number(map.humidity ?? 0),
    tempRange: String(map.tempRange ?? ''),
    humidityRange: String(map.humidityRange ?? ''),
    tempCondition: String(map.tempCondition ?? 'Unknown'),
    humidityCondition: String(map.humidityCondition ?? 'Unknown'),
    trendInsight: String(map.trendInsight ?? ''),
    nextAction: String(map.nextAction ?? ''),
    updatedAt: latestUpdate || new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    let thingId = process.env.ARDUINO_THING_ID!;
    let careProfile = null;
    let plantNickname: string | null = null;
    let plantSpecies: string | null = null;
    let plantImageUrl: string | null = null;
    let personalized = false;

    // Check if user is authenticated and has a device
    const personalize = request.nextUrl.searchParams.get('personalized');
    if (personalize === 'true') {
      try {
        const auth = await createClient();
        const { data: { user } } = await auth.auth.getUser();
        if (user) {
          const { data: device } = await supabase
            .from('devices')
            .select('thing_id, care_profile, plant_nickname, plant_species, plant_image_url, setup_complete')
            .eq('user_id', user.id)
            .single();
          if (device?.thing_id) {
            thingId = device.thing_id;
            personalized = true;
            if (device.setup_complete && device.care_profile) {
              careProfile = device.care_profile;
              plantNickname = device.plant_nickname;
              plantSpecies = device.plant_species;
              plantImageUrl = device.plant_image_url;
            }
          }
        }
      } catch {
        // Fall through to generic mode
      }
    }

    const data = await getArduinoData(thingId);
    return NextResponse.json({
      ...data,
      personalized,
      careProfile,
      plantNickname,
      plantSpecies,
      plantImageUrl,
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    console.error('Prototype data error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch sensor data' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
