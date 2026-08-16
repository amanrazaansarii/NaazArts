import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid email or password format';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, password } = validated.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Look up user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        addresses: {
          where: { isDefault: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    // Generate token and set HTTP-only cookie
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    await setAuthCookie(token);

    const defaultAddress = user.addresses[0]
      ? {
          fullName: user.addresses[0].fullName,
          street: user.addresses[0].street,
          city: user.addresses[0].city,
          state: user.addresses[0].state,
          zipCode: user.addresses[0].zipCode,
          country: user.addresses[0].country,
          phone: user.addresses[0].phone || '',
        }
      : undefined;

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        memberSince: user.memberSince,
        avatarText: user.avatarText,
        defaultAddress,
      },
    });
  } catch (error: any) {
    console.error('[API] Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during sign in. Please try again.' },
      { status: 500 }
    );
  }
}
