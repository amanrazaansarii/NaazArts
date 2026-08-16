import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { workshopSchema } from '@/lib/validators';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const validated = workshopSchema.partial().safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid workshop data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const updated = await prisma.workshop.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json({ success: true, workshop: updated });
  } catch (error: any) {
    console.error('[API] Update workshop error:', error);
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.workshop.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Workshop deleted' });
  } catch (error: any) {
    console.error('[API] Delete workshop error:', error);
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
}
