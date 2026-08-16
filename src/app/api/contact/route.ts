import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSubmissionSchema } from '@/lib/validators';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSubmissionSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Please fill in all required fields';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { name, email, phone, type, workshopSession, message } = validated.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        type: type || 'General inquiry',
        workshopSession: workshopSession || null,
        message,
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received by our studio team.',
      id: submission.id,
    });
  } catch (error: any) {
    console.error('[API] Contact submission error:', error);
    return NextResponse.json(
      { error: 'Could not send your message at this time. Please try again.' },
      { status: 500 }
    );
  }
}
