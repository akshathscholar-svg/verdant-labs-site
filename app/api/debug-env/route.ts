import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ARDUINO_CLIENT_ID_v2: process.env.ARDUINO_CLIENT_ID_v2 ? 'SET' : 'MISSING',
    ARDUINO_CLIENT_SECRET_v2: process.env.ARDUINO_CLIENT_SECRET_v2 ? 'SET' : 'MISSING',
    ARDUINO_THING_ID_v2: process.env.ARDUINO_THING_ID_v2 ? 'SET' : 'MISSING',
    ARDUINO_CLIENT_ID: process.env.ARDUINO_CLIENT_ID ? 'SET' : 'MISSING',
    ARDUINO_CLIENT_SECRET: process.env.ARDUINO_CLIENT_SECRET ? 'SET' : 'MISSING',
    ARDUINO_THING_ID: process.env.ARDUINO_THING_ID ? 'SET' : 'MISSING',
  });
}
