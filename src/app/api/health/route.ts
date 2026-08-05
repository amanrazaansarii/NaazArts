import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'NaazArts Next.js App Router',
    timestamp: new Date().toISOString()
  });
}
