import { NextResponse } from 'next/server';

/**
 * Prototype data API route.
 *
 * Currently returns mock data shaped exactly like what the Arduino Cloud
 * integration will provide. To go live, replace the `getMockData()` call
 * with a fetch to your Arduino Cloud REST API or IoT webhook endpoint.
 */

interface PrototypeData {
  plantName: string;
  plantStatus: string;
  moisture: number;
  moistureLabel: string;
  light: number;
  lightLabel: string;
  temperature: number;
  humidity: number;
  tempRange: string;
  humidityRange: string;
  tempCondition: string;
  humidityCondition: string;
  trendInsight: string;
  nextAction: string;
  updatedAt: string;
}

function getMockData(): PrototypeData {
  // Slight randomisation so the dashboard feels alive while mocked
  const baseMoisture = 862;
  const baseLight = 250;
  const baseTemp = 57.0;
  const baseHumidity = 42;

  const jitter = (base: number, range: number) =>
    Math.round((base + (Math.random() - 0.5) * range) * 10) / 10;

  const moisture = jitter(baseMoisture, 80);
  const light = jitter(baseLight, 60);
  const temperature = jitter(baseTemp, 4);
  const humidity = jitter(baseHumidity, 6);

  const moistureLabel = moisture > 700 ? 'Dry' : moisture > 400 ? 'Moderate' : 'Wet';
  const lightLabel = light < 200 ? 'Very Low' : light < 400 ? 'Low' : light < 700 ? 'Moderate' : 'Bright';
  const tempCondition =
    temperature < 65 ? 'Too Low' : temperature > 85 ? 'Too High' : 'In Range';
  const humidityCondition =
    humidity < 40 ? 'Too Low' : humidity > 80 ? 'Too High' : 'In Range';

  const issues: string[] = [];
  if (tempCondition !== 'In Range') issues.push(`Temperature is ${tempCondition.toLowerCase()} for Monstera Albo`);
  if (humidityCondition !== 'In Range') issues.push(`Humidity is ${humidityCondition.toLowerCase()}`);
  if (moistureLabel === 'Dry') issues.push('Soil moisture is low');

  const plantStatus =
    issues.length === 0 ? 'Healthy' : issues.length === 1 ? 'Monitor Closely' : 'Needs Attention';

  const trendInsight = issues.length > 0 ? issues[0] : 'All conditions within optimal range';

  const actions: Record<string, string> = {
    'Too Low': 'Move plant to a warmer area',
    'Too High': 'Move plant to a cooler spot or increase airflow',
    'In Range': '',
  };
  let nextAction = actions[tempCondition] || '';
  if (!nextAction && moistureLabel === 'Dry') nextAction = 'Water your plant soon';
  if (!nextAction) nextAction = 'No action needed — keep it up!';

  return {
    plantName: 'Monstera Albo',
    plantStatus,
    moisture,
    moistureLabel,
    light,
    lightLabel,
    temperature,
    humidity,
    tempRange: '65-85 °F',
    humidityRange: '40-80 %',
    tempCondition,
    humidityCondition,
    trendInsight,
    nextAction,
    updatedAt: new Date().toISOString(),
  };
}

/*
 * ── Swap this function to fetch from Arduino Cloud ──
 *
 * async function getArduinoData(): Promise<PrototypeData> {
 *   const res = await fetch('https://api2.arduino.cc/iot/v2/things/YOUR_THING_ID/properties', {
 *     headers: { Authorization: `Bearer ${process.env.ARDUINO_API_TOKEN}` },
 *   });
 *   const raw = await res.json();
 *   // reshape `raw` into PrototypeData ...
 *   return shaped;
 * }
 */

export async function GET() {
  const data = getMockData();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
