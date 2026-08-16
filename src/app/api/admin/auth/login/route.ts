import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';

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

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    if (user.role !== 'ADMIN' && user.email !== 'creativenaaz.business@gmail.com' && user.email !== 'admin@naazarts.com') {
      return NextResponse.json({ error: 'Access denied: Admin privileges required' }, { status: 403 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: 'ADMIN',
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'ADMIN',
      },
    });
  } catch (error: any) {
    console.error('[API] Admin login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during admin sign-in' }, { status: 500 });
  }
}
