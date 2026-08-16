import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/lib/validators';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = signupSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid input data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { name, email, password } = validated.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // Hash password & create user
    const passwordHash = await hashPassword(password);
    const avatarText = name.slice(0, 2).toUpperCase();

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        avatarText,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      },
    });

    // Create session token & cookie
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        memberSince: user.memberSince,
        avatarText: user.avatarText,
        defaultAddress: null,
      },
    });
  } catch (error: any) {
    console.error('[API] Signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during account creation. Please try again.' },
      { status: 500 }
    );
  }
}
