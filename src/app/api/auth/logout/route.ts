import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(config.cookieName);
    return response;
  } catch (error: any) {
    console.error('[API] Logout error:', error);
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
  }
}
