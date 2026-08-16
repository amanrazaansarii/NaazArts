import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const q = searchParams.get('q')?.toLowerCase().trim();

    let submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (type && type !== 'ALL') {
      submissions = submissions.filter((s) => s.type.toLowerCase() === type.toLowerCase());
    }

    if (status && status !== 'ALL') {
      submissions = submissions.filter((s) => s.status === status.toUpperCase());
    }

    if (q) {
      submissions = submissions.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.message.toLowerCase().includes(q) ||
          (s.workshopSession && s.workshopSession.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ submissions });
  } catch (error: any) {
    console.error('[API] Admin get inquiries error:', error);
    return NextResponse.json({ error: 'Failed to retrieve inquiries' }, { status: 500 });
  }
}
