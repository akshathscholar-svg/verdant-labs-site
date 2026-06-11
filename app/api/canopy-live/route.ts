import { NextRequest, NextResponse } from 'next/server';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 30_000) {
    console.log('Using cached token');
    return cachedToken.token;
  }
  
  // Try both naming conventions
  const clientId = process.env.ARDUINO_CLIENT_ID_v2 || process.env.ARDUINO_CLIENT_ID;
  const clientSecret = process.env.ARDUINO_CLIENT_SECRET_v2 || process.env.ARDUINO_CLIENT_SECRET;
  
  console.log('Checking credentials:', {
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    ARDUINO_CLIENT_ID_v2: !!process.env.ARDUINO_CLIENT_ID_v2,
    ARDUINO_CLIENT_SECRET_v2: !!process.env.ARDUINO_CLIENT_SECRET_v2,
    ARDUINO_CLIENT_ID: !!process.env.ARDUINO_CLIENT_ID,
    ARDUINO_CLIENT_SECRET: !!process.env.ARDUINO_CLIENT_SECRET,
  });
  
  if (!clientId || !clientSecret) {
    const msg = 'Missing Arduino credentials - checked ARDUINO_CLIENT_ID_v2, ARDUINO_CLIENT_SECRET_v2, ARDUINO_CLIENT_ID, ARDUINO_CLIENT_SECRET';
    console.error(msg);
    throw new Error(msg);
  }
  
  console.log('Requesting new token from Arduino Cloud');
  
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
  
  console.log('Token request status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Token request error:', errorText);
    throw new Error('Arduino auth failed: ' + res.status + ' - ' + errorText.substring(0, 200));
  }
  
  const json = await res.json();
  if (!json.access_token) {
    console.error('No access token in response:', json);
    throw new Error('No access token received from Arduino Cloud');
  }
  
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  console.log('Token obtained successfully, expires in:', json.expires_in, 'seconds');
  return cachedToken.token;
}

async function getCanopyData(thingId: string) {
  const token = await getToken();
  const url = 'https://api2.arduino.cc/iot/v2/things/' + thingId + '/properties';
  console.log('Fetching from:', url);
  
  const res = await fetch(url, {
    method: 'GET',
    headers: { 
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Arduino API response status:', res.status);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Arduino API error response:', errorText);
    throw new Error('Arduino API error: ' + res.status + ' - ' + errorText.substring(0, 200));
  }
  
  const properties: Array<{ variable_name: string; last_value: unknown; value_updated_at: string }> = await res.json();
  console.log('Received properties:', properties.length);
  
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
    // Try both naming conventions
    const thingId = process.env.ARDUINO_THING_ID_v2 || process.env.ARDUINO_THING_ID;
    
    console.log('Checking Thing ID:', {
      hasThingId: !!thingId,
      ARDUINO_THING_ID_v2: !!process.env.ARDUINO_THING_ID_v2,
      ARDUINO_THING_ID: !!process.env.ARDUINO_THING_ID,
    });
    
    if (!thingId) {
      throw new Error('Missing Arduino Thing ID - checked ARDUINO_THING_ID_v2 and ARDUINO_THING_ID');
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
