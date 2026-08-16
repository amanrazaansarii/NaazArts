import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { comparePassword, signToken, setAuthCookie, hashPassword } from '@/lib/auth';
import { config } from '@/lib/config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid email or password';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, password } = validated.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if master credentials used
    const isMasterDirector =
      (normalizedEmail === 'creativenaaz.business@gmail.com' || normalizedEmail === 'admin@naazarts.com') &&
      password === 'StudioMaster2026!';

    let user: any = null;
    let isMatch = false;

    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (user) {
        isMatch = await comparePassword(password, user.passwordHash);
      }
    } catch (dbErr) {
      console.warn('[API] DB lookup warning during admin login:', dbErr);
    }

    // Allow master login fallback if master credentials match
    if (isMasterDirector) {
      isMatch = true;
      if (!user) {
        user = {
          id: 'admin-master',
          name: 'Naaz Studio Director',
          email: normalizedEmail,
          role: 'ADMIN',
        };
        // Attempt background persistence if possible
        try {
          const passHash = await hashPassword(password);
          await prisma.user.upsert({
            where: { email: normalizedEmail },
            update: { role: 'ADMIN', passwordHash: passHash },
            create: {
              name: 'Naaz Studio Director',
              email: normalizedEmail,
              passwordHash: passHash,
              role: 'ADMIN',
            },
          });
        } catch {}
      }
    }

    if (!user || !isMatch) {
      return NextResponse.json({ error: 'Invalid admin email or password' }, { status: 401 });
    }

    if (user.role !== 'ADMIN' && !isMasterDirector) {
      return NextResponse.json({ error: 'Access denied: Admin privileges required' }, { status: 403 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name || 'Studio Director',
      role: 'ADMIN',
    });

    // Set cookie using next/headers
    try {
      await setAuthCookie(token);
    } catch (cookieErr) {
      console.warn('[API] next/headers setAuthCookie warning:', cookieErr);
    }

    // Also set cookie directly on the response object for universal environment support
    const response = NextResponse.json({
      success: true,
      admin: {
        id: user.id,
        name: user.name || 'Studio Director',
        email: user.email,
        role: 'ADMIN',
      },
    });

    response.cookies.set({
      name: config.cookieName,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('[API] Admin login critical error:', error);
    return NextResponse.json(
      { error: error?.message || 'Authentication error. Please verify your credentials and try again.' },
      { status: 500 }
    );
  }
}
