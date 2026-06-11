import { NextRequest, NextResponse } from 'next/server';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }
  
  const clientId = process.env.ARDUINO_CLIENT_ID_v2;
  const clientSecret = process.env.ARDUINO_CLIENT_SECRET_v2;
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Arduino V2 credentials');
  }
  
  const res = await fetch('https://api2.arduino.cc/iot/v1/clients/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'https://api2.arduino.cc/iot',
    }),
  });
  
  if (!res.ok) throw new Error('Arduino auth failed: ' + res.status);
  const json = await res.json();
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return cachedToken.token;
}

async function getCanopyData(thingId: string) {
  const token = await getToken();
  const res = await fetch(
    'https://api2.arduino.cc/iot/v2/things/' + thingId + '/properties',
    { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' },
  );
  
  if (!res.ok) throw new Error('Arduino API error: ' + res.status);
  const properties: Array<{ variable_name: string; last_value: unknown; value_updated_at: string }> = await res.json();
  const map: Record<string, unknown> = {};
  
  for (const p of properties) {
    map[p.variable_name] = p.last_value;
  }
  
  return {
    temperature: Number(map.temperature ?? 0),
    humidity: Number(map.humidity ?? 0),
    light: Number(map.light ?? 0),
    moisture: Number(map.moisture ?? 0),
    plantStatus: String(map.plantStatus ?? 'Unknown'),
    stressScore: Number(map.stressScore ?? 0),
    aiReccomendation: String(map.aiReccomendation ?? ''),
  };
}

export async function GET(request: NextRequest) {
  try {
    const thingId = process.env.ARDUINO_THING_ID_v2;
    if (!thingId) {
      throw new Error('Missing Arduino V2 Thing ID');
    }
    
    const data = await getCanopyData(thingId);
    
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err) {
    console.error('Canopy live data error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch sensor data' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
