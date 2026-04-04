let cachedToken: { token: string; expiresAt: number } | null = null;

async function getArduinoToken(): Promise<string> {
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

/** Map a light level description to analog sensor thresholds */
function lightLevelToThresholds(level: string): { min: number; max: number } {
  const l = (level || '').toLowerCase();
  if (l.includes('low')) return { min: 0, max: 300 };
  if (l.includes('full sun') || l.includes('direct')) return { min: 500, max: 1023 };
  if (l.includes('bright')) return { min: 300, max: 700 };
  // default: medium / moderate
  return { min: 200, max: 600 };
}

/**
 * Push care profile values to Arduino Cloud Thing properties.
 * These 7 cloud-writable properties must exist on the Thing:
 *   targetPlant, targetTempMin, targetTempMax,
 *   targetHumidityMin, targetHumidityMax,
 *   targetLightMin, targetLightMax
 */
export async function pushCareProfileToDevice(
  thingId: string,
  profile: {
    species?: string;
    commonName?: string;
    care?: {
      temperature?: { min?: number; max?: number };
      humidity?: { min?: number; max?: number };
      light?: { level?: string };
    };
  },
) {
  const token = await getArduinoToken();

  // Fetch all properties to get their IDs
  const propsRes = await fetch(
    `https://api2.arduino.cc/iot/v2/things/${thingId}/properties`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' },
  );
  if (!propsRes.ok) {
    console.error('Failed to fetch Arduino properties:', propsRes.status);
    return;
  }
  const properties: Array<{ variable_name: string; id: string }> = await propsRes.json();
  const propMap = new Map(properties.map(p => [p.variable_name, p.id]));

  const lightThresholds = lightLevelToThresholds(profile.care?.light?.level || '');

  const updates: Record<string, string | number> = {
    targetPlant: profile.commonName || profile.species || 'Unknown Plant',
    targetTempMin: profile.care?.temperature?.min ?? 60,
    targetTempMax: profile.care?.temperature?.max ?? 85,
    targetHumidityMin: profile.care?.humidity?.min ?? 30,
    targetHumidityMax: profile.care?.humidity?.max ?? 80,
    targetLightMin: lightThresholds.min,
    targetLightMax: lightThresholds.max,
  };

  for (const [varName, value] of Object.entries(updates)) {
    const propId = propMap.get(varName);
    if (!propId) {
      console.warn(`Arduino property "${varName}" not found — add it to your Thing in Arduino Cloud`);
      continue;
    }
    const pubRes = await fetch(
      `https://api2.arduino.cc/iot/v2/things/${thingId}/properties/${propId}/publish`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      },
    );
    if (!pubRes.ok) {
      console.error(`Failed to push ${varName}:`, pubRes.status);
    }
  }
}
