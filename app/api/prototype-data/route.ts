import { NextResponse } from 'next/server';

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

async function getArduinoData() {
  const token = await getToken();
  const thingId = process.env.ARDUINO_THING_ID!;
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

export async function GET() {
  try {
    const data = await getArduinoData();
    return NextResponse.json(data, {
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
