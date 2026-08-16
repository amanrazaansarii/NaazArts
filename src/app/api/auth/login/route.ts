import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validators';
import { comparePassword, signToken, hashPassword } from '@/lib/auth';
import { config } from '@/lib/config';

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

    // Check if demo credentials
    const isDemoPatron =
      normalizedEmail === 'patron@naazarts.com' &&
      (password === 'StudioPatron2026!' || password === 'Maya Lin' || password === '');

    let user: any = null;
    let isMatch = false;

    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          addresses: {
            where: { isDefault: true },
            take: 1,
          },
        },
      });

      if (user) {
        if (isDemoPatron) {
          isMatch = true;
        } else {
          isMatch = await comparePassword(password, user.passwordHash);
        }
      }
    } catch (dbErr) {
      console.warn('[API] DB lookup warning during patron login:', dbErr);
    }

    // Auto-provision demo patron on demand if not present in database
    if (isDemoPatron && !user) {
      isMatch = true;
      try {
        const passwordHash = await hashPassword('StudioPatron2026!');
        user = await prisma.user.upsert({
          where: { email: 'patron@naazarts.com' },
          update: {},
          create: {
            name: 'Maya Lin',
            email: 'patron@naazarts.com',
            passwordHash,
            memberSince: 'August 2026',
            avatarText: 'ML',
          },
          include: {
            addresses: {
              where: { isDefault: true },
              take: 1,
            },
          },
        });

        // Ensure default address exists
        if (!user.addresses || user.addresses.length === 0) {
          const addr = await prisma.address.create({
            data: {
              userId: user.id,
              fullName: 'Maya Lin',
              street: '248 Hawthorne Blvd, Suite 2',
              city: 'Portland',
              state: 'OR',
              zipCode: '97214',
              country: 'United States',
              phone: '+1 (503) 914-2849',
              isDefault: true,
            },
          });
          user.addresses = [addr];
        }
      } catch (provisionErr) {
        console.warn('[API] Demo patron auto-provision fallback:', provisionErr);
        // In-memory fallback if DB is completely unreachable
        user = {
          id: 'usr-demo-patron',
          name: 'Maya Lin',
          email: 'patron@naazarts.com',
          memberSince: 'August 2026',
          avatarText: 'ML',
          addresses: [
            {
              fullName: 'Maya Lin',
              street: '248 Hawthorne Blvd, Suite 2',
              city: 'Portland',
              state: 'OR',
              zipCode: '97214',
              country: 'United States',
              phone: '+1 (503) 914-2849',
            },
          ],
        };
      }
    }

    if (!user || !isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const defaultAddress = user.addresses?.[0]
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

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        memberSince: user.memberSince || 'August 2026',
        avatarText: user.avatarText || user.name.slice(0, 2).toUpperCase(),
        defaultAddress,
      },
    });

    // Set cookie directly on response object (guaranteed Vercel & serverless compatibility)
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
    console.error('[API] Login error:', error);
    return NextResponse.json(
      { error: error?.message || 'An unexpected error occurred during sign in. Please try again.' },
      { status: 500 }
    );
  }
}
