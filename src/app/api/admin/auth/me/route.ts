import { NextResponse } from 'next/server';
import { getAdminUser, verifyToken } from '@/lib/auth';
import { config } from '@/lib/config';

export async function GET(req: Request) {
  try {
    let admin = await getAdminUser();

    // Fallback: check cookie directly from request headers if getAdminUser was null
    if (!admin) {
      const cookieHeader = req.headers.get('cookie') || '';
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').filter(Boolean).map((c) => {
          const [key, ...v] = c.split('=');
          return [key, decodeURIComponent(v.join('='))];
        })
      );
      const token = cookies[config.cookieName];
      if (token) {
        const payload = await verifyToken(token);
        if (payload && (payload.role === 'ADMIN' || payload.email === 'creativenaaz.business@gmail.com' || payload.email === 'admin@naazarts.com')) {
          admin = payload;
        }
      }
    }

    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, admin });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
