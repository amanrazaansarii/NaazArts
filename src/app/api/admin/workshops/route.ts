import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { workshopSchema } from '@/lib/validators';

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ workshops });
  } catch (error: any) {
    console.error('[API] Get workshops error:', error);
    return NextResponse.json({ error: 'Failed to retrieve workshops' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = workshopSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid workshop data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const workshop = await prisma.workshop.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, workshop });
  } catch (error: any) {
    console.error('[API] Create workshop error:', error);
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
